# GitHub Push Commands

Since you've already set up your Git user information:
```
git config --global user.name "Bish311"
git config --global user.email "bishwayan.24bcs10200@sst.scaler.com"
```

You can now push your repository to GitHub with these commands:

## 1. Create a GitHub Repository

1. Go to GitHub: https://github.com/new
2. Repository name: `notesvault`
3. Description: `A lightweight notes app with tagging and search functionality`
4. Choose visibility (public or private)
5. Click "Create repository" without initializing with README, .gitignore, or license

## 2. Push Your Repository

Run these commands in your terminal (replace `Bish311` with your GitHub username if different):

```bash
git remote add origin https://github.com/Bish311/notesvault.git
git branch -M main
git push -u origin main
```

## 3. GitHub Authentication

When prompted for credentials:
- For username: Enter your GitHub username
- For password: Use a personal access token (not your GitHub password)

If you don't have a personal access token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Give it a name like "NotesVault Project"
4. Select "repo" permissions
5. Click "Generate token"
6. Copy the token and use it as your password when pushing

## 4. Verify Your Repository

After pushing, visit:
https://github.com/Bish311/notesvault

You should see all your project files there.
