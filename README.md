# Google OAuth Login Page

A simple, modern Google OAuth login page built with HTML, CSS, JavaScript, and Node.js.

## Features

- Clean, modern UI design
- Google OAuth 2.0 authentication
- User profile display after login
- Sign out functionality
- Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost` (if using XAMPP)
   - Add authorized redirect URIs:
     - `http://localhost:3000`
     - `http://localhost` (if using XAMPP)
5. Copy your Client ID and API Key

### 3. Update Configuration

Open `app.js` and replace the following placeholders:

```javascript
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```

And in the `initializeGapiClient` function:

```javascript
apiKey: 'YOUR_GOOGLE_API_KEY',
```

### 4. Run the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:3000` in your browser.

## File Structure

```
.
├── index.html      # Main HTML page
├── styles.css      # Styling
├── app.js          # Frontend JavaScript (OAuth logic)
├── server.js       # Node.js server
├── package.json    # Dependencies
└── README.md       # This file
```

## How It Works

1. User clicks "Sign in with Google" button
2. Google OAuth popup appears for authentication
3. After successful authentication, user profile is displayed
4. User can sign out to return to login screen

## Security Notes

- Never commit your actual Client ID and API Key to version control
- For production, use environment variables
- Always validate tokens server-side in production applications
- Use HTTPS in production

## Troubleshooting

**"Sign in with Google" button doesn't work:**
- Make sure you've updated the CLIENT_ID and API_KEY in `app.js`
- Check browser console for errors
- Verify your Google Cloud Console credentials are correct

**CORS errors:**
- Make sure your authorized origins in Google Cloud Console match your server URL
- Check that you're accessing the page from the correct URL

## 🚀 Deploy to Vercel (Free Hosting)

This project is ready to deploy to **Vercel** - a free hosting platform perfect for Google OAuth!

### Quick Deploy Steps:

1. **Push your code to GitHub** (create a free account if needed)
2. **Sign up at [Vercel.com](https://vercel.com)** (free)
3. **Import your GitHub repository**
4. **Deploy** - Vercel handles everything automatically!

📖 **See [DEPLOY.md](./DEPLOY.md) for detailed step-by-step instructions**

### Why Vercel?
- ✅ 100% Free for personal projects
- ✅ Automatic HTTPS (required for Google OAuth)
- ✅ Easy GitHub integration
- ✅ Fast global CDN
- ✅ Perfect for Node.js apps

**Important**: After deploying, update your Google Cloud Console to add your Vercel URL (`https://your-project.vercel.app`) to authorized origins.

## License

MIT

