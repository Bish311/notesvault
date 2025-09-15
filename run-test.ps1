# NotesVault Test Runner

Write-Host "=== NotesVault Test Runner ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will start the backend and frontend for testing"
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking if MongoDB is running..." -NoNewline

try {
    # Try to connect to MongoDB
    $mongoStatus = $null
    $mongoStatus = Invoke-Expression "mongo --eval `"db.version()`"" 2>&1
    
    if ($?) {
        Write-Host " OK!" -ForegroundColor Green
    } else {
        throw "MongoDB not running"
    }
} catch {
    Write-Host " Failed!" -ForegroundColor Red
    Write-Host "ERROR: MongoDB is not running. Please start MongoDB first." -ForegroundColor Red
    Write-Host "You can download MongoDB from https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    exit
}

Write-Host ""

# Navigate to backend directory and install dependencies
Write-Host "Setting up backend..." -ForegroundColor Cyan
Set-Location -Path ".\backend"

Write-Host "Installing backend dependencies..." -NoNewline
$npmInstall = $null
$npmInstall = Invoke-Expression "npm install" 2>&1

if ($?) {
    Write-Host " Done!" -ForegroundColor Green
} else {
    Write-Host " Failed!" -ForegroundColor Red
    Write-Host "ERROR: Could not install backend dependencies." -ForegroundColor Red
    Set-Location -Path ".."
    exit
}

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command", "Set-Location -Path '$PWD'; npm start; Read-Host 'Press Enter to exit'"

# Wait for backend to start
Write-Host "Waiting for backend server to initialize..." -NoNewline
Start-Sleep -Seconds 5
Write-Host " Done!" -ForegroundColor Green

# Navigate to frontend directory and install dependencies
Set-Location -Path "..\frontend"
Write-Host ""
Write-Host "Setting up frontend..." -ForegroundColor Cyan

Write-Host "Installing frontend dependencies..." -NoNewline
$npmInstall = $null
$npmInstall = Invoke-Expression "npm install" 2>&1

if ($?) {
    Write-Host " Done!" -ForegroundColor Green
} else {
    Write-Host " Failed!" -ForegroundColor Red
    Write-Host "ERROR: Could not install frontend dependencies." -ForegroundColor Red
    Set-Location -Path ".."
    exit
}

# Start frontend server
Write-Host "Starting frontend development server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command", "Set-Location -Path '$PWD'; npm start; Read-Host 'Press Enter to exit'"

# Return to root directory
Set-Location -Path ".."

Write-Host ""
Write-Host "=== NotesVault is now running! ===" -ForegroundColor Green
Write-Host ""
Write-Host "* Backend API: http://localhost:5000"
Write-Host "* Frontend: http://localhost:3000"
Write-Host ""
Write-Host "Press Ctrl+C to stop this script and close the servers."

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    # This will execute when Ctrl+C is pressed
    Write-Host ""
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    
    # Kill the Node.js processes (simplified, in production you'd want to be more specific)
    Get-Process -Name "node" | Stop-Process -Force
    
    Write-Host "=== Test run completed ===" -ForegroundColor Cyan
}
