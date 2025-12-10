// Google OAuth Configuration
// Note: tokenClient, gapiInited, gisInited, and initialization functions are defined inline in index.html
const CLIENT_ID = '384084300027-bv1hdmk7vb3ousl077hs7isnfe2qvfkc.apps.googleusercontent.com';

// Handle sign in
function handleAuthClick() {
    if (!window.tokenClient) {
        console.error('Token client not initialized');
        alert('Google Sign-In is not ready. Please refresh the page.');
        return;
    }

    window.tokenClient.callback = async (resp) => {
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
        window.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        window.tokenClient.requestAccessToken({ prompt: '' });
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

