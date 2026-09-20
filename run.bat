@echo off
setlocal

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0run.ps1"
if errorlevel 1 (
    echo.
    echo Script gagal dijalankan. Periksa pesan error di atas.
    pause
    exit /b 1
)

endlocal