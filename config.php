<?php
/**
 * Google Login Configuration
 * 
 * This file contains the Google Client ID needed for authentication.
 * Replace YOUR_GOOGLE_CLIENT_ID with your actual Google Client ID
 * obtained from Google Cloud Console.
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
