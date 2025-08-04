@echo off
echo ========================================
echo   OnlyInternship.in React Setup
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo Choose the LTS version and restart your computer after installation
    echo.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version
echo.

echo Checking npm...
npm --version
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo Starting React development server...
echo The app will open in your browser at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm start 