# NotesVault API Test Runner

Write-Host "=== NotesVault API Test Runner ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location -Path ".\backend"

# Install node-fetch if not already installed
Write-Host "Installing test dependencies..." -NoNewline
$npmInstall = $null
$npmInstall = Invoke-Expression "npm install --no-save node-fetch" 2>&1

if ($?) {
    Write-Host " Done!" -ForegroundColor Green
} else {
    Write-Host " Failed!" -ForegroundColor Red
    Write-Host "ERROR: Could not install test dependencies." -ForegroundColor Red
    Set-Location -Path ".."
    exit
}

# Start the backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
$serverProcess = Start-Process node -ArgumentList "server.js" -PassThru -NoNewWindow

# Wait for server to start
Write-Host "Waiting for server to initialize..." -NoNewline
Start-Sleep -Seconds 5
Write-Host " Done!" -ForegroundColor Green
Write-Host ""

# Run the API test
Write-Host "Running API tests..." -ForegroundColor Cyan
Write-Host ""
node test-api.js

# Stop the server when tests are complete
Write-Host ""
Write-Host "Stopping server..." -ForegroundColor Yellow
Stop-Process -Id $serverProcess.Id -Force

# Return to root directory
Set-Location -Path ".."

Write-Host ""
Write-Host "=== API Test completed ===" -ForegroundColor Cyan
