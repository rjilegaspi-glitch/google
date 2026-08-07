<?php
/**
 * Google Login Configuration
 * 
 * This file contains the Google Client ID needed for authentication.
 * Replace YOUR_GOOGLE_CLIENT_ID with your actual Google Client ID
 * obtained from Google Cloud Console.
 * 
 * IMPORTANT: Domain Authorization
 * ===============================
 * After deploying to a new domain (e.g., lintech.space), you MUST:
 * 1. Go to Google Cloud Console > APIs & Services > Credentials
 * 2. Click on your OAuth 2.0 Client ID
 * 3. Add your domain to "Authorized JavaScript origins"
 *    Example: https://lintech.space
 * 4. Also add to "Authorized redirect URIs" if needed
 *    Example: https://lintech.space/google/
 * 
 * If this step is skipped, the Google Sign-In button will not render
 * and users will see an error message instead of the login button.
 */

// Google Client ID from Google Cloud Console
// Replace this with your actual Google Client ID
define('GOOGLE_CLIENT_ID', '317163779539-apnrqideq1m8am4k54smg0ve2tfdhsdt.apps.googleusercontent.com');

// Google Client Secret (not used in this flow, but defined for completeness)
// This should never be exposed in frontend
define('GOOGLE_CLIENT_SECRET', '');

// Session cookie configuration for security
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'Lax');

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
