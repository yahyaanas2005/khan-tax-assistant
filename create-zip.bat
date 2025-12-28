@echo off
echo ========================================
echo Creating ZIP file for Vercel deployment
echo ========================================
echo.

cd /d "%~dp0"

echo Cleaning up old files...
if exist "tax-assistant.zip" del "tax-assistant.zip"

echo.
echo Creating ZIP file...
echo This may take a minute...
echo.

powershell -command "Compress-Archive -Path '.\*' -DestinationPath '.\tax-assistant.zip' -Force"

if exist "tax-assistant.zip" (
    echo.
    echo ========================================
    echo SUCCESS! ZIP file created!
    echo ========================================
    echo.
    echo File location: %cd%\tax-assistant.zip
    echo.
    echo Next steps:
    echo 1. Go to https://vercel.com/new
    echo 2. Click "Upload" or "Browse"
    echo 3. Select the file: tax-assistant.zip
    echo 4. Follow the BEGINNER_GUIDE.md instructions
    echo.
    echo ========================================
) else (
    echo.
    echo ERROR: Failed to create ZIP file
    echo Please make sure you have PowerShell installed
    echo.
)

pause
