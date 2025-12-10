const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Google OAuth Configuration (Server-side)
// Note: These should be stored as environment variables in production
// Set them in Vercel: Project Settings → Environment Variables
// See VERCEL_ENV_SETUP.md for instructions
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional: API endpoint to verify tokens server-side
app.post('/api/verify-token', express.json(), async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    
    try {
        // Verify token with Google
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
        const data = await response.json();
        
        if (data.error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        res.json({ valid: true, user: data });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Failed to verify token' });
    }
});

// Export for Vercel serverless functions
module.exports = app;

// Only listen when running locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log('Open your browser and navigate to the URL above');
    });
}

