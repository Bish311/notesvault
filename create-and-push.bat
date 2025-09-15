@echo off
echo ===== GitHub Repository Creation and Push =====
echo.

echo Step 1: Creating GitHub repository...
echo Please enter your GitHub credentials when prompted.

:: Create a new repository on GitHub
gh repo create notesvault --description "A lightweight notes app with tagging and search functionality" --private

echo.
echo Step 2: Pushing local code to the new repository...

:: Push the code to the new repository
git push -u origin main

echo.
echo If successful, your code is now on GitHub!
echo Visit: https://github.com/Bish311/notesvault
pause
