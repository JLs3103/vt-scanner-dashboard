package main

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type User struct {
	ID              string     `gorm:"column:id;type:uuid;default:gen_random_uuid();primaryKey"`
	FullName        string     `gorm:"column:full_name"`
	Email           string     `gorm:"column:email"`
	PasswordHash    *string    `gorm:"column:password_hash"`
	Role            string     `gorm:"column:role"`
	IsActive        bool       `gorm:"column:is_active"`
	EmailVerifiedAt *time.Time `gorm:"column:email_verified_at"`
}

func (User) TableName() string { return "users" }

type Session struct {
	ID         string     `gorm:"column:id;type:uuid;default:gen_random_uuid();primaryKey"`
	UserID     string     `gorm:"column:user_id;type:uuid"`
	TokenHash  string     `gorm:"column:token_hash"`
	ExpiresAt  time.Time  `gorm:"column:expires_at"`
	RevokedAt  *time.Time `gorm:"column:revoked_at"`
	CreatedAt  time.Time  `gorm:"column:created_at"`
	LastUsedAt *time.Time `gorm:"column:last_used_at"`
}

func (Session) TableName() string { return "sessions" }

type SignInRequest struct {
	Email      string `json:"email" binding:"required,email"`
	Password   string `json:"password" binding:"required"`
	RememberMe bool   `json:"rememberMe"`
}

type SignUpRequest struct {
	FullName string `json:"fullName" binding:"required,min=2,max=150"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

type Server struct {
	db *gorm.DB
}

func main() {
	_ = godotenv.Load()

	db, err := connectDatabase()
	if err != nil {
		panic(err)
	}

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{envOrDefault("FRONTEND_URL", "http://localhost:3000")},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	server := &Server{db: db}
	router.GET("/health", server.health)
	router.POST("/api/auth/signin", server.signIn)
	router.POST("/api/auth/signup", server.signUp)

	port := envOrDefault("PORT", "8080")
	if err := router.Run(":" + port); err != nil {
		panic(err)
	}
}

func connectDatabase() (*gorm.DB, error) {
	dsn := "host=" + envOrDefault("DB_HOST", "localhost") +
		" user=" + envOrDefault("DB_USER", "root") +
		" password=" + os.Getenv("DB_PASSWORD") +
		" dbname=" + envOrDefault("DB_NAME", "vt_scanner") +
		" port=" + envOrDefault("DB_PORT", "5432") +
		" sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}

func (server *Server) health(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func (server *Server) signIn(context *gin.Context) {
	var request SignInRequest
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Enter a valid email and password."})
		return
	}

	email := strings.ToLower(strings.TrimSpace(request.Email))
	var user User
	if err := server.db.Where("email = ?", email).First(&user).Error; err != nil || !user.IsActive || user.PasswordHash == nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password."})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*user.PasswordHash), []byte(request.Password)); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password."})
		return
	}

	rawToken, err := newSessionToken()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create session."})
		return
	}

	expiresAt := time.Now().UTC().Add(24 * time.Hour)
	if request.RememberMe {
		expiresAt = time.Now().UTC().Add(30 * 24 * time.Hour)
	}

	session := Session{
		UserID:    user.ID,
		TokenHash: hashToken(rawToken),
		ExpiresAt: expiresAt,
		CreatedAt: time.Now().UTC(),
	}
	if err := server.db.Create(&session).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create session."})
		return
	}

	context.SetSameSite(http.SameSiteLaxMode)
	secureCookie := os.Getenv("APP_ENV") == "production"
	context.SetCookie("aegis_session", rawToken, int(time.Until(expiresAt).Seconds()), "/", "", secureCookie, true)
	context.JSON(http.StatusOK, gin.H{
		"user": gin.H{"id": user.ID, "fullName": user.FullName, "email": user.Email, "role": user.Role},
	})
}

func (server *Server) signUp(context *gin.Context) {
	var request SignUpRequest
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Enter a valid name, email, and password of at least 8 characters."})
		return
	}

	email := strings.ToLower(strings.TrimSpace(request.Email))
	fullName := strings.TrimSpace(request.FullName)
	var existing User
	if err := server.db.Where("email = ?", email).First(&existing).Error; err == nil {
		context.JSON(http.StatusConflict, gin.H{"error": "An account with this email already exists."})
		return
	} else if err != gorm.ErrRecordNotFound {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create account."})
		return
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create account."})
		return
	}
	hash := string(passwordHash)
	user := User{
		FullName:     fullName,
		Email:        email,
		PasswordHash: &hash,
		Role:         "analyst",
		IsActive:     true,
	}
	if err := server.db.Create(&user).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create account."})
		return
	}

	context.Status(http.StatusCreated)
}

func newSessionToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(bytes), nil
}

func hashToken(token string) string {
	digest := sha256.Sum256([]byte(token))
	return base64.RawURLEncoding.EncodeToString(digest[:])
}

func envOrDefault(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
