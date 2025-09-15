# GitHub Repository Setup Instructions

Follow these steps to create a GitHub repository and push your NotesVault project:

## 0. Configure Git user information (if not already done)

If this is your first time using Git on this computer, you need to configure your user information:

```bash
git config --global user.name "Bish311"
git config --global user.email "bishwayan.24bcs10200@sst.scaler.com"
```

Replace "Your Name" with your name and "your.email@example.com" with the email associated with your GitHub account.

## 1. Create a new GitHub repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Repository name: `notesvault`
4. Description: `A lightweight notes app with tagging and search functionality`
5. Choose either "Public" or "Private" visibility
6. Do NOT initialize the repository with a README, .gitignore, or license
7. Click "Create repository"

## 2. Connect your local repository to GitHub

After creating the repository, GitHub will show you commands to link your existing repository.
Run these commands in your terminal:

```bash
# You've already set the remote to Bish311
git remote set-url origin https://github.com/Bish311/notesvault.git
git branch -M main
git push -u origin main
```

### 2.1. Alternative Push Method with Token

If you have trouble authenticating with regular methods, create a personal access token:

1. Go to: https://github.com/settings/tokens and create a token with "repo" scope
2. Use this command with your token:

```bash
git remote set-url origin https://Bish311:YOUR_TOKEN@github.com/Bish311/notesvault.git
git push -u origin main
```

## 3. Verify the repository is on GitHub

1. Go to `https://github.com/YOUR_USERNAME/notesvault`
2. You should see all your project files there

## 4. Additional GitHub Setup (Optional)

Consider adding these to your GitHub repository:
- A detailed README with screenshots
- GitHub Actions workflow for CI/CD
- Issue templates for bug reports and feature requests
