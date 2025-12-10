// Google OAuth Configuration
const CLIENT_ID = '384084300027-bv1hdmk7vb3ousl077hs7isnfe2qvfkc.apps.googleusercontent.com';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Initialize Google API
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: 'YOUR_GOOGLE_API_KEY',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest'],
    });
    gapiInited = true;
    maybeEnableButtons();
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
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw resp;
        }
        await getUserInfo();
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

