<?php
/**
 * Login Page
 * 
 * This is the main login page where users can sign in with their Google account.
 * It displays the login form and initializes Google Identity Services.
 */

require_once 'config.php';

// If user is already authenticated, redirect to dashboard
if (!empty($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Google Login</title>
    
    <!-- Google Identity Services Library -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <!-- Logo/Application Icon -->
            <div class="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 21H3v-2a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v2"></path>
                    <circle cx="15" cy="7" r="4"></circle>
                </svg>
            </div>

            <!-- Application Name -->
            <h1 class="app-title">Google Login</h1>

            <!-- Welcome Message -->
            <p class="welcome-message">Sign in with your Google account to get started</p>

            <!-- Google Sign In Button Container -->
            <div id="g_id_onload"
                 data-client_id="<?php echo htmlspecialchars(GOOGLE_CLIENT_ID); ?>"
                 data-callback="handleCredentialResponse"
                 data-auto_prompt="false">
            </div>

            <div class="google-button-container">
                <div id="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="signin_with" data-shape="rectangular" data-logo_alignment="left"></div>
                <!-- Note: If Google button doesn't appear, ensure your domain is added to "Authorized JavaScript origins" in Google Cloud Console -->
            </div>

            <!-- Error Message Container -->
            <div id="error-message" class="error-message" style="display: none;"></div>

            <!-- Loading Indicator -->
            <div id="loading" class="loading-indicator" style="display: none;">
                <div class="spinner"></div>
                <p>Authenticating...</p>
            </div>
        </div>
    </div>

    <!-- Custom JavaScript -->
    <script src="assets/js/login.js"></script>
</body>
</html>
