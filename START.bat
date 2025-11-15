@echo off
echo ============================================
echo   3D WEBSITE BUILDER
echo   Baslatiliyor...
echo ============================================
echo.
echo Tarayicida su adresi ac: http://localhost:8080
echo.
echo Kapatmak icin bu pencereyi kapat.
echo.

cd /d "%~dp0dist"
python -m http.server 8080

pause
