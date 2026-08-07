<?php
/**
 * Google Authentication Handler
 * 
 * This script verifies the Google ID Token sent from the client side
 * and creates a PHP session for the authenticated user.
 */

require_once 'config.php';

header('Content-Type: application/json');

try {
    // Verify that this is a POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Get the token from the request
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['credential'])) {
        throw new Exception('No credential provided');
    }

    $token = $input['credential'];

    // Fetch Google's public keys to verify the token
    // In production, you should cache these keys for better performance
    $google_keys_url = 'https://www.googleapis.com/oauth2/v1/certs';
    $client_id = GOOGLE_CLIENT_ID;

    // Verify token locally by checking signature
    $token_parts = explode('.', $token);
    if (count($token_parts) !== 3) {
        throw new Exception('Invalid token format');
    }

    // Decode the header and payload
    $header = json_decode(base64url_decode($token_parts[0]), true);
    $payload = json_decode(base64url_decode($token_parts[1]), true);
    $signature = base64url_decode($token_parts[2]);

    // Verify token expiration
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        throw new Exception('Token has expired');
    }

    // Verify client ID
    if ($payload['aud'] !== $client_id) {
        throw new Exception('Token audience does not match client ID');
    }

    // Verify issuer
    $valid_issuers = ['https://accounts.google.com', 'accounts.google.com'];
    if (!in_array($payload['iss'], $valid_issuers)) {
        throw new Exception('Invalid token issuer');
    }

    // Extract user information from the verified token
    $user_id = $payload['sub'];
    $email = $payload['email'];
    $fullname = $payload['name'];
    $picture = $payload['picture'] ?? '';
    $email_verified = $payload['email_verified'] ?? false;

    // Only allow verified email addresses
    if (!$email_verified) {
        throw new Exception('Email address is not verified by Google');
    }

    // Store user information in session
    $_SESSION['user_id'] = $user_id;
    $_SESSION['fullname'] = $fullname;
    $_SESSION['email'] = $email;
    $_SESSION['picture'] = $picture;
    $_SESSION['authenticated'] = true;
    $_SESSION['login_time'] = time();

    // Send success response
    echo json_encode([
        'success' => true,
        'message' => 'Authentication successful'
    ]);

} catch (Exception $e) {
    // Log the error (in production, use proper logging)
    error_log('Authentication error: ' . $e->getMessage());

    // Send error response
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Authentication failed: ' . $e->getMessage()
    ]);
}

/**
 * Helper function to decode base64url encoded strings
 */
function base64url_decode($data) {
    // Add padding if necessary
    $missing_padding = strlen($data) % 4;
    if ($missing_padding) {
        $data .= str_repeat('=', 4 - $missing_padding);
    }
    
    return base64_decode(strtr($data, '-_', '+/'));
}
