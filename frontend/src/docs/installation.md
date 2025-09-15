# NotesVault Installation Guide

## Prerequisites
- Node.js v14.x or later
- npm v6.x or later
- MongoDB (local installation or Atlas account)

## Setup Instructions

### 1. Install Dependencies

Due to PowerShell execution policy restrictions, you'll need to manually install the required packages. Open Command Prompt (not PowerShell) and run:

```
cd path\to\frontend
npm install react-markdown
```

You can also set the execution policy temporarily to allow script execution in PowerShell (requires administrator privileges):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install react-markdown
```

### 2. Start the Application

#### Backend
```
cd path\to\backend
npm start
```

#### Frontend
```
cd path\to\frontend
npm start
```

## Features

The NotesVault application includes:

- Create, read, update, and delete notes
- Tag-based organization
- Markdown support with live preview
- Dark mode support
- Responsive design

## Troubleshooting

If you encounter issues with npm commands in PowerShell, try using Command Prompt instead, or use the bypass execution policy approach mentioned above.
