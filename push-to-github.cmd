@echo off
echo ===== Push to GitHub =====
echo.

echo Before running this batch file, make sure you've:
echo 1. Created a repository named "notesvault" on GitHub
echo 2. Have your GitHub username and access token ready
echo.
echo Press any key to continue or CTRL+C to cancel...
pause > nul

echo.
echo Setting up remote repository...
git remote set-url origin https://github.com/Bish311/notesvault.git

echo.
echo Pushing code to GitHub...
git push -u origin main

echo.
echo If successful, your code is now on GitHub!
echo Visit: https://github.com/Bish311/notesvault
pause
