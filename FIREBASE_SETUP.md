# Firebase Setup Instructions

Your Cosmic Tasks app has been migrated to use Firebase for cloud storage! This means you can now access your tasks from any computer.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" (or use an existing project)
3. Enter a project name (e.g., "cosmic-tasks")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, go to **Build** → **Authentication**
2. Click "Get started"
3. Click on the **Sign-in method** tab
4. Enable **Google** sign-in provider:
   - Click on "Google"
   - Toggle "Enable"
   - Select a support email
   - Click "Save"

### 3. Create Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Start in **production mode** (we'll add security rules)
4. Choose a location (pick one closest to you)
5. Click "Enable"

### 4. Set up Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

### 5. Get Your Firebase Config

1. In Firebase Console, go to **Project settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app (e.g., "Cosmic Tasks Web")
5. Copy the `firebaseConfig` object

### 6. Create Environment File

1. In your project root, create a file called `.env`
2. Copy the contents from `.env.example`
3. Fill in your Firebase config values:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 7. Add .env to .gitignore

Make sure your `.env` file is NOT committed to Git:

```bash
echo ".env" >> .gitignore
```

### 8. Start Your App

```bash
npm run dev
```

## How It Works

### Data Migration

The app automatically migrates your localStorage data to Firebase on first login:

1. **First time signing in**: Your existing tasks are uploaded to Firebase
2. **Subsequent logins**: Your tasks sync from Firebase
3. **Multiple devices**: Sign in with the same Google account to access your tasks everywhere

### Real-time Sync

- All changes are automatically saved to Firebase
- Changes sync across all your devices in real-time
- No need to manually save or refresh

### What Gets Synced

- ✅ All tasks (inbox, up next, waiting, assistant, completed)
- ✅ Task notes and subtasks
- ✅ Archived tasks
- ✅ Column customizations
- ✅ Task order and organization

## Troubleshooting

### "Failed to sync with cloud"

- Check your internet connection
- Verify your `.env` file has the correct Firebase credentials
- Check Firebase Console → Firestore Database → Rules to ensure they're set correctly

### "Sign in failed"

- Ensure Google sign-in is enabled in Firebase Authentication
- Check that your support email is set in Google provider settings

### Tasks not appearing

- Make sure you're signed in with the same Google account
- Check browser console for errors
- Verify Firestore rules allow read/write for your user ID

## Security Notes

- Your `.env` file contains sensitive credentials - never commit it to Git
- Firestore rules ensure users can only access their own data
- Authentication is required to read/write any data

## Need Help?

If you run into issues, check:
1. Browser console for error messages
2. Firebase Console → Authentication to verify your user is signed in
3. Firebase Console → Firestore Database to see if data is being written

Enjoy your cloud-synced Cosmic Tasks! 🚀✨
