$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Frontend = Join-Path $Root "frontend"
$Backend = Join-Path $Root "backend"

function Test-RequiredCommand($Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Perintah '$Name' tidak ditemukan. Install terlebih dahulu lalu jalankan ulang script ini."
    }
}

Test-RequiredCommand "node"
Test-RequiredCommand "npm"

if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Menyalakan PostgreSQL dengan Docker..." -ForegroundColor Cyan
    Push-Location $Root
    docker compose up -d db
    Pop-Location
} else {
    Write-Warning "Docker tidak ditemukan. PostgreSQL dilewati."
}

if (-not (Test-Path (Join-Path $Frontend "node_modules"))) {
    Write-Host "Menginstall dependency frontend..." -ForegroundColor Cyan
    Push-Location $Frontend
    npm ci
    Pop-Location
}

Write-Host "Menjalankan pemeriksaan lint frontend..." -ForegroundColor Cyan
Push-Location $Frontend
npm run lint
Pop-Location

Write-Host "Membuat production build frontend..." -ForegroundColor Cyan
Push-Location $Frontend
npm run build
Pop-Location

$GoFiles = Get-ChildItem -Path $Backend -Filter "*.go" -File -ErrorAction SilentlyContinue
if ($GoFiles) {
    Test-RequiredCommand "go"
    Write-Host "Menjalankan backend Go pada terminal baru..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "Set-Location '$Backend'; go run ."
    )
} else {
    Write-Warning "Backend belum memiliki file .go, jadi hanya frontend yang dijalankan."
}

Write-Host "Menjalankan frontend di http://localhost:3000 ..." -ForegroundColor Green
Push-Location $Frontend
npm run dev
Pop-Location