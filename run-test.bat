@echo off
echo.
echo === NotesVault Test Runner ===
echo.
echo This script will start the backend and frontend for testing
echo.

REM Check if MongoDB is running
echo Checking if MongoDB is running...
mongo --eval "db.version()" > nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MongoDB is not running. Please start MongoDB first.
    echo You can download MongoDB from https://www.mongodb.com/try/download/community
    goto :end
)

echo MongoDB is running.
echo.

REM Navigate to backend directory and install dependencies
echo Setting up backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies.
    goto :end
)

REM Start backend server in a new window
start cmd /k "echo Starting NotesVault backend server... && npm start"
echo Backend server starting...
echo.
timeout /t 5 /nobreak > nul

REM Navigate to frontend directory and install dependencies
echo Setting up frontend...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies.
    goto :end
)

REM Start frontend development server in a new window
start cmd /k "echo Starting NotesVault frontend development server... && npm start"
echo Frontend server starting...
echo.

REM Return to the root directory
cd ..

echo.
echo === NotesVault is now running! ===
echo.
echo * Backend API: http://localhost:5000
echo * Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers and exit.
pause > nul

REM Kill the servers
taskkill /f /im node.exe > nul 2>&1

:end
echo.
echo === Test run completed ===
echo.
