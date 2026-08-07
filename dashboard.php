<?php
/**
 * Dashboard Page
 * 
 * This is a protected page that displays user information after successful authentication.
 * Users are redirected here after successfully signing in with Google.
 */

require_once 'config.php';

// Check if user is authenticated
if (empty($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    // Redirect to login page if not authenticated
    header('Location: index.php');
    exit;
}

// Get user information from session
$user_id = htmlspecialchars($_SESSION['user_id'] ?? '');
$fullname = htmlspecialchars($_SESSION['fullname'] ?? '');
$email = htmlspecialchars($_SESSION['email'] ?? '');
$picture = htmlspecialchars($_SESSION['picture'] ?? '');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dashboard</title>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-card">
            <!-- Profile Section -->
            <div class="profile-section">
                <!-- Profile Picture -->
                <?php if (!empty($picture)): ?>
                    <img src="<?php echo $picture; ?>" alt="Profile Picture" class="profile-picture">
                <?php else: ?>
                    <div class="profile-picture-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Welcome Message -->
            <h1 class="welcome-heading">Welcome, <?php echo $fullname; ?>!</h1>

            <!-- User Information -->
            <div class="user-info">
                <div class="info-item">
                    <label class="info-label">Email:</label>
                    <p class="info-value"><?php echo $email; ?></p>
                </div>

                <div class="info-item">
                    <label class="info-label">Google ID:</label>
                    <p class="info-value"><?php echo $user_id; ?></p>
                </div>
            </div>

            <!-- Logout Button -->
            <div class="logout-section">
                <a href="logout.php" class="logout-button">Logout</a>
            </div>
        </div>
    </div>
</body>
</html>
