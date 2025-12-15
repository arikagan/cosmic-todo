# Cosmic Tasks ✨

A beautiful, cloud-synced todo app with a cosmic theme.

## Features

- 🌐 **Cloud Sync**: Access your tasks from any device
- 🔐 **Secure Authentication**: Sign in with Google
- 📱 **Real-time Updates**: Changes sync instantly across devices
- 🎨 **Beautiful UI**: Cosmic-themed design with animations
- 📋 **5-Column Organization**: Inbox, Up Next, Waiting, Assistant, Completed
- 📝 **Rich Tasks**: Add notes, subtasks, and URLs
- 🗂️ **Archive System**: Archive completed tasks with auto-Monday cleanup
- 🎯 **Drag & Drop**: Easily reorder and move tasks between columns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- A Google account for authentication
- A Firebase project (free tier is fine)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions)

4. Create a `.env` file with your Firebase credentials:
   ```bash
   cp .env.example .env
   # Edit .env and add your Firebase config
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Migration from localStorage

If you were using the app before the Firebase migration, don't worry! Your data is safe.

**On first sign-in**, the app will automatically:
1. Detect your existing localStorage data
2. Upload it to Firebase
3. Associate it with your Google account
4. Continue syncing from Firebase going forward

Your local data will be preserved and accessible from any device.

## Technology Stack

- **React** - UI framework
- **Firebase** - Authentication and cloud database
- **Firestore** - Real-time database
- **Vite** - Build tool
- **Tailwind CSS** - Styling (inline)
- **Lucide React** - Icons

## Security

- All data is protected by Firebase Authentication
- Firestore security rules ensure users can only access their own data
- Environment variables keep your Firebase credentials secure
- `.env` file is gitignored to prevent credential leaks

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT

## Support

For setup help, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

---

*A small moment in an infinite universe* 🌌
