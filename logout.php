<?php
/**
 * Logout Handler
 * 
 * This script destroys the user session and logs out the user.
 * After logout, the user is redirected back to the login page.
 */

require_once 'config.php';

// Destroy all session data
if (session_status() === PHP_SESSION_ACTIVE) {
    // Clear all session variables
    $_SESSION = [];
    
    // Destroy the session
    session_destroy();
}

// Redirect to login page
header('Location: index.php');
exit;
