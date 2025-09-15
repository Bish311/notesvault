# Use this script after creating a GitHub repository
# Replace YOUR_USERNAME with your GitHub username

# Set the GitHub repository URL
$githubUsername = "YOUR_USERNAME"
$repoName = "notesvault"

Write-Host "=== GitHub Push Setup ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will push your NotesVault project to GitHub" -ForegroundColor White
Write-Host ""

# Prompt for GitHub username if not provided
if ($githubUsername -eq "YOUR_USERNAME") {
    $githubUsername = Read-Host "Enter your GitHub username"
}

# Check if Git user info is configured
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "Git user information not configured!" -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $userName) {
        $newName = Read-Host "Enter your name for Git commits"
        git config --global user.name "$newName"
    }
    
    if (-not $userEmail) {
        $newEmail = Read-Host "Enter your email for Git commits"
        git config --global user.email "$newEmail"
    }
    
    Write-Host "Git user information configured successfully!" -ForegroundColor Green
    Write-Host ""
}

# Set remote origin
$remoteUrl = "https://github.com/$githubUsername/$repoName.git"
Write-Host "Setting remote repository to: $remoteUrl" -ForegroundColor White
git remote add origin $remoteUrl

# Set main branch and push
Write-Host "Pushing to GitHub..." -ForegroundColor White
git branch -M main
git push -u origin main

# Check if push was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== Success! ===" -ForegroundColor Green
    Write-Host "Your NotesVault project has been pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "View your repository at: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "=== Error! ===" -ForegroundColor Red
    Write-Host "Failed to push to GitHub. Please check your GitHub credentials and repository settings." -ForegroundColor Red
}
