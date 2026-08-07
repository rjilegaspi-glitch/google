/**
 * Google Login System - JavaScript Handler
 * 
 * This file handles the Google Sign-In button interaction and
 * communicates with the backend authentication handler.
 */

/**
 * Handle the Google credential response
 * This function is called by Google when the user completes authentication
 * 
 * @param {Object} response - The response object from Google containing the credential token
 */
function handleCredentialResponse(response) {
    if (response.credential) {
        // Show loading indicator
        showLoading(true);
        hideError();

        // Send the token to the backend for verification
        fetch('auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credential: response.credential
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Authentication successful, redirect to dashboard
                window.location.href = 'dashboard.php';
            } else {
                // Authentication failed, show error message
                showError(data.message || 'Authentication failed. Please try again.');
                showLoading(false);
            }
        })
        .catch(error => {
            // Network or parsing error
            console.error('Error:', error);
            showError('An error occurred during authentication. Please try again.');
            showLoading(false);
        });
    }
}

/**
 * Display error message to the user
 * 
 * @param {string} message - The error message to display
 */
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Hide the error message
 */
function hideError() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Show or hide the loading indicator
 * 
 * @param {boolean} show - True to show, false to hide
 */
function showLoading(show) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

/**
 * Handle Google Sign-In callback when auto-prompt shows a UI notification
 */
function handleSignOut() {
    console.log('User has been signed out');
}

/**
 * Initialize Google Sign-In when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if Google API is loaded
    if (typeof google !== 'undefined' && google.accounts) {
        // Initialize Google Sign-In
        // The configuration is already set in the HTML via data attributes
        console.log('Google Sign-In initialized');
    }
});

/**
 * Fallback handler if user manually revokes access
 */
function handleRevokedAccess() {
    console.log('Access has been revoked');
    // You can redirect to login page or show a message
}
