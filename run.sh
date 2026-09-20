#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND="$ROOT/frontend"
BACKEND="$ROOT/backend"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Perintah '$1' tidak ditemukan. Install terlebih dahulu lalu jalankan ulang script ini." >&2
    exit 1
  fi
}

require_command node
require_command npm

if command -v docker >/dev/null 2>&1; then
  echo "Menyalakan PostgreSQL dengan Docker..."
  (cd "$ROOT" && docker compose up -d db)
else
  echo "Peringatan: Docker tidak ditemukan. PostgreSQL dilewati." >&2
fi

if [ ! -d "$FRONTEND/node_modules" ]; then
  echo "Menginstall dependency frontend..."
  (cd "$FRONTEND" && npm ci)
fi

echo "Menjalankan pemeriksaan lint frontend..."
(cd "$FRONTEND" && npm run lint)

echo "Membuat production build frontend..."
(cd "$FRONTEND" && npm run build)

if find "$BACKEND" -maxdepth 1 -name '*.go' -type f | grep -q .; then
  require_command go
  echo "Menjalankan backend Go..."
  (cd "$BACKEND" && go run .) &
  BACKEND_PID=$!
  trap 'kill "$BACKEND_PID" 2>/dev/null || true' EXIT INT TERM
else
  echo "Peringatan: backend belum memiliki file .go, jadi hanya frontend yang dijalankan." >&2
fi

echo "Menjalankan frontend di http://localhost:3000 ..."
cd "$FRONTEND"
npm run dev