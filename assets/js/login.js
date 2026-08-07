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
        // Clear existing content
        buttonContainer.innerHTML = '';
        
        // Create error message container
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        
        // Create heading
        const heading = document.createElement('strong');
        heading.textContent = 'Google Sign-In Unavailable';
        errorDiv.appendChild(heading);
        
        // Create description
        const description = document.createElement('p');
        description.textContent = 'The Google authentication service is not accessible. This usually means:';
        errorDiv.appendChild(description);
        
        // Create list of possible causes
        const list = document.createElement('ul');
        const causes = [
            'Your domain is not authorized in Google Cloud Console',
            'Google API script blocked by your network or browser',
            'Network connectivity issue'
        ];
        causes.forEach(cause => {
            const item = document.createElement('li');
            item.textContent = cause;
            list.appendChild(item);
        });
        errorDiv.appendChild(list);
        
        // Create action paragraph with reload button
        const actionPara = document.createElement('p');
        actionPara.textContent = 'Please contact your administrator or ';
        
        const reloadBtn = document.createElement('button');
        reloadBtn.id = 'reload-btn';
        reloadBtn.className = 'reload-link';
        reloadBtn.textContent = 'refresh this page';
        reloadBtn.addEventListener('click', function() {
            location.reload();
        });
        
        actionPara.appendChild(reloadBtn);
        actionPara.appendChild(document.createTextNode(' to try again.'));
        errorDiv.appendChild(actionPara);
        
        // Append to container
        buttonContainer.appendChild(errorDiv);
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
                callback: handleCredentialResponse,
                error_callback: handleGoogleSignInError
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
        handleGoogleLoadFailure();
    }
}

/**
 * Handle Google Sign-In errors
 */
function handleGoogleSignInError(error) {
    console.error('Google Sign-In error:', error);
    handleGoogleLoadFailure();
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
                console.error('Google API failed to load after 5 seconds. Possible causes:\n1. Domain not authorized in Google Cloud Console\n2. Google API script blocked by network/browser\n3. Invalid Client ID in config.php');
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
