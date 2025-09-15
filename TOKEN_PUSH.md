# GitHub Push with Token

Follow these steps to push your code to GitHub:

## 1. Create a Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Note: "NotesVault Project"
4. Select "repo" scope (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

## 2. Create a GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `notesvault`
3. Description: `A lightweight notes app with tagging and search functionality`
4. Choose visibility (public or private)
5. Click "Create repository"

## 3. Push with Token URL

Replace `YOUR_TOKEN` with the token you created in step 1 and run:

```
cd "c:\Users\Bishwayan Chatterjee\Desktop\firse_webdev\learnshit\projects\mrinal\vault"
git remote set-url origin https://Bish311:YOUR_TOKEN@github.com/Bish311/notesvault.git
git push -u origin main
```

## 4. Verify Repository

Go to: https://github.com/Bish311/notesvault
