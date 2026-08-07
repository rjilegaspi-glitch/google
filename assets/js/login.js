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
 * Handle the case where Google button fails to render
 */
function handleGoogleLoadFailure() {
    console.warn('Google Sign-In failed to load');
    const buttonContainer = document.querySelector('.google-button-container');
    if (buttonContainer) {
        buttonContainer.innerHTML = '<p class="error-message" style="display: block;">Google Sign-In is currently unavailable. Please refresh the page or try again later.</p>';
    }
}

/**
 * Initialize and render Google Sign-In button when Google API loads
 */
function initializeGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        try {
            // Initialize Google Sign-In
            google.accounts.id.initialize({
                client_id: document.getElementById('g_id_onload').getAttribute('data-client_id'),
                callback: handleCredentialResponse
            });
            
            // Render the button
            google.accounts.id.renderButton(
                document.getElementById('g_id_signin'),
                {
                    type: 'standard',
                    size: 'large',
                    theme: 'outline',
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left'
                }
            );
            
            console.log('Google Sign-In button rendered successfully');
        } catch (error) {
            console.error('Error initializing Google Sign-In:', error);
            handleGoogleLoadFailure();
        }
    } else {
        console.warn('Google API not available');
    }
}

/**
 * Initialize Google Sign-In when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if Google API is loaded
    if (typeof google !== 'undefined' && google.accounts) {
        // Initialize immediately if Google is already loaded
        initializeGoogleSignIn();
    } else {
        // Wait for Google API to load
        let checkCount = 0;
        const maxChecks = 50; // Check for 5 seconds (50 * 100ms)
        
        const checkGoogleAPI = setInterval(function() {
            checkCount++;
            
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                clearInterval(checkGoogleAPI);
                initializeGoogleSignIn();
            } else if (checkCount >= maxChecks) {
                // Google API failed to load
                clearInterval(checkGoogleAPI);
                console.error('Google API failed to load after 5 seconds');
                handleGoogleLoadFailure();
            }
        }, 100);
    }
});

/**
 * Fallback handler if user manually revokes access
 */
function handleRevokedAccess() {
    console.log('Access has been revoked');
    // You can redirect to login page or show a message
}
