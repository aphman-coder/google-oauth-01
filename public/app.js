// Google OAuth Configuration
const CLIENT_ID = '384084300027-bv1hdmk7vb3ousl077hs7isnfe2qvfkc.apps.googleusercontent.com'; // ✅ Already set correctly

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Initialize Google API
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    try {
        await gapi.client.init({
            apiKey: 'AIzaSyAVQfynHYU5HIjnooAgYJueI8yGkE2QL6c',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest'],
        });
        gapiInited = true;
        maybeEnableButtons();
    } catch (error) {
        console.error('Error initializing Google API:', error);
        alert('Failed to initialize Google API. Please check your API Key configuration.');
    }
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('google-signin-btn').disabled = false;
    }
}

// Handle sign in
function handleAuthClick() {
    if (!tokenClient) {
        console.error('Token client not initialized');
        alert('Google Sign-In is not ready. Please refresh the page.');
        return;
    }

    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            console.error('OAuth error:', resp.error);
            alert('Sign-in failed: ' + resp.error);
            return;
        }
        try {
            await getUserInfo();
        } catch (error) {
            console.error('Error after sign-in:', error);
            alert('Failed to get user information. Please try again.');
        }
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

// Get user information
async function getUserInfo() {
    try {
        const response = await gapi.client.oauth2.userinfo.get();
        const user = response.result;
        
        // Display user info
        document.getElementById('user-avatar').src = user.picture || '';
        document.getElementById('user-name').textContent = user.name || 'User';
        document.getElementById('user-email').textContent = user.email || '';
        
        // Show user section, hide login section
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('user-section').classList.remove('hidden');
    } catch (error) {
        console.error('Error getting user info:', error);
        alert('Failed to get user information. Please try again.');
    }
}

// Handle sign out
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        
        // Show login section, hide user section
        document.getElementById('user-section').classList.add('hidden');
        document.getElementById('login-section').classList.remove('hidden');
    }
}

// Event listeners
document.getElementById('google-signin-btn').addEventListener('click', handleAuthClick);
document.getElementById('signout-btn').addEventListener('click', handleSignoutClick);

// Check if user is already signed in on page load
window.addEventListener('load', () => {
    // You can add logic here to check for existing session
});

