# PHP Google Login System

A simple, beginner-friendly web application for authenticating users using their **Google Account** through **Google Identity Services (GIS)**. No database, no local storage, purely PHP sessions.

## 📋 Project Overview

This project provides a lightweight Google Sign-In implementation using:
- **PHP 8+** for server-side authentication
- **Google Identity Services (GIS)** for OAuth 2.0 authentication
- **PHP Sessions** to maintain user state
- **HTML5, CSS3, and Vanilla JavaScript** for the frontend
- **No database or file storage** - completely session-based

The application is perfect for beginners learning about authentication and is production-ready with proper security measures.

## 📁 Folder Structure

```
project/
│
├── index.php                 # Login page with Google Sign-In button
├── auth.php                  # Verify Google token and create session
├── dashboard.php             # Protected page showing user info
├── logout.php                # Destroy session and redirect to login
├── config.php                # Configuration with Google Client ID
│
├── assets/
│   ├── css/
│   │   └── style.css         # All styling (no frameworks)
│   │
│   └── js/
│       └── login.js          # Frontend Google Sign-In handler
│
├── README.md                 # This file
└── .gitignore                # Git ignore file
```

## 📋 Requirements

### System Requirements
- PHP 8.0 or higher
- A web server (Apache, Nginx, or built-in PHP server)
- Modern web browser with JavaScript enabled
- Internet connection (for Google APIs)

### Software Stack
- **PHP 8+**
- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **Google Identity Services (GIS)**

**NOT used:**
- No frameworks (Laravel, CodeIgniter, Symfony)
- No databases (MySQL, PostgreSQL, MongoDB, SQLite)
- No frontend frameworks (React, Vue, Angular)
- No CSS frameworks (Bootstrap, Tailwind)
- No Composer packages (only vanilla PHP)

## 🚀 Installation Steps

### Step 1: Download or Clone the Project

```bash
# Clone from repository
git clone https://github.com/rjilegaspi-glitch/google.git
cd google
```

### Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click **"New Project"**
5. Enter a project name (e.g., "Google Login Demo")
6. Click **"Create"**
7. Wait for the project to be created

### Step 3: Enable Google Identity Services API

1. In the Google Cloud Console, go to **APIs & Services**
2. Click **"Enable APIs and Services"** button
3. Search for **"Google+ API"**
4. Click on it and press **"Enable"**
5. Go back to **APIs & Services** → **Credentials**

### Step 4: Create OAuth 2.0 Credentials

1. Click **"+ Create Credentials"** button at the top
2. Select **"OAuth client ID"**
3. If prompted, configure the OAuth consent screen first:
   - Choose **"External"** as User Type
   - Fill in the required fields (App name, User support email, etc.)
   - Add your email in Developer contact
   - Save and Continue
4. Return to creating OAuth client ID
5. Select **"Web application"** as Application type
6. Add URIs:
   - **Authorized JavaScript origins:** `http://localhost` (for local testing)
   - **Authorized redirect URIs:** `http://localhost/google/` (adjust based on your setup)
7. Click **"Create"**
8. Copy your **Client ID** from the popup

### Step 5: Configure the Project

1. Open `config.php` in your project
2. Replace the placeholder with your Google Client ID:

```php
define('GOOGLE_CLIENT_ID', 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com');
```

Example:
```php
define('GOOGLE_CLIENT_ID', '123456789-abc123def456.apps.googleusercontent.com');
```

3. Save the file

## 🏃 Running the Project

### Option 1: Using XAMPP

1. **Install XAMPP** from https://www.apachefriends.org/
2. **Start Apache** via XAMPP Control Panel
3. **Place the project** in `C:\xampp\htdocs\google\` (Windows) or `/Applications/XAMPP/htdocs/google/` (macOS)
4. Open browser and go to: `http://localhost/google/`

### Option 2: Using HestiaCP (VPS/Dedicated Server)

1. **Upload files** to your domain's public_html folder via FTP or file manager
2. **Ensure PHP is enabled** for the domain
3. **Update authorized URIs** in Google Cloud Console with your domain
4. Visit your domain in browser

### Option 3: Using Apache (Linux)

```bash
# Install Apache and PHP
sudo apt-get install apache2 php libapache2-mod-php

# Clone the project
cd /var/www/html
sudo git clone https://github.com/rjilegaspi-glitch/google.git

# Set proper permissions
sudo chown -R www-data:www-data /var/www/html/google
sudo chmod -R 755 /var/www/html/google

# Restart Apache
sudo systemctl restart apache2
```

### Option 4: Using Nginx

```bash
# Install Nginx and PHP
sudo apt-get install nginx php-fpm

# Update Nginx configuration to serve PHP files
# Then restart
sudo systemctl restart nginx
sudo systemctl restart php-fpm
```

### Option 5: Using PHP Built-in Server (Development Only)

```bash
cd /path/to/google
php -S localhost:8000
```

Visit: `http://localhost:8000` in your browser

## 🔐 Security Features

- ✅ **Token Verification:** Google ID Token is verified on the server
- ✅ **Expiration Check:** Expired tokens are rejected
- ✅ **Audience Validation:** Token audience must match Client ID
- ✅ **Issuer Verification:** Only tokens from Google are accepted
- ✅ **Email Verification:** Only verified email addresses are allowed
- ✅ **Session Security:** HTTPOnly and SameSite session cookies
- ✅ **HTML Escaping:** All output is HTML-escaped to prevent XSS
- ✅ **Session Protection:** Protected routes check for valid sessions
- ✅ **No Password Storage:** Users never create passwords

## 📝 Code Walkthrough

### 1. **config.php** - Configuration File
- Stores the Google Client ID
- Initializes PHP sessions
- Configures session security

### 2. **index.php** - Login Page
- Displays Google Sign-In button via GIS
- Redirects authenticated users to dashboard
- Handles authentication flow initialization

### 3. **assets/js/login.js** - Frontend Handler
- Captures Google authentication response
- Sends ID Token to backend
- Handles errors and loading states

### 4. **auth.php** - Token Verification
- Verifies Google ID Token signature
- Extracts user information
- Creates secure PHP session
- Returns JSON response

### 5. **dashboard.php** - Protected Page
- Checks if user is authenticated
- Redirects to login if not
- Displays user profile information

### 6. **logout.php** - Session Cleanup
- Destroys PHP session
- Clears all session variables
- Redirects to login page

## 🎨 UI/UX Features

- **Responsive Design:** Works on all screen sizes (mobile, tablet, desktop)
- **Modern Layout:** Centered card-based design with smooth animations
- **Blue Accent Colors:** Professional and welcoming appearance
- **Soft Shadows:** Subtle depth and hierarchy
- **Smooth Animations:** Slide-in effects and hover states
- **Loading Indicators:** Visual feedback during authentication
- **Error Messages:** Clear feedback if authentication fails

## 🔄 Authentication Flow

```
User → [index.php]
        ↓
    Google Sign-In
        ↓
    Google Popup
        ↓
    User Grants Access
        ↓
    Google Returns ID Token
        ↓
    [assets/js/login.js]
        ↓
    Send Token to [auth.php]
        ↓
    Verify Token (check signature, expiry, issuer, audience)
        ↓
    Extract User Info
        ↓
    Create PHP Session
        ↓
    Redirect to [dashboard.php]
        ↓
    Display Profile Info
```

## 🛡️ Session Variables

Only these variables are stored:
```php
$_SESSION['user_id']        // Google's unique user ID
$_SESSION['fullname']       // User's full name from Google
$_SESSION['email']          // User's email address
$_SESSION['picture']        // User's profile picture URL
$_SESSION['authenticated']  // Boolean flag
$_SESSION['login_time']     // Timestamp of login
```

**No passwords, no sensitive data, no database records.**

## 🐛 Troubleshooting

### "Invalid Client ID" Error
- Verify the Client ID is correct in `config.php`
- Check spelling and extra spaces
- Regenerate credentials in Google Cloud Console

### "Redirect URI mismatch"
- Update authorized redirect URIs in Google Cloud Console
- Include the full domain and path

### Button Not Showing
- Ensure Google GIS library is loaded: `<script src="https://accounts.google.com/gsi/client"></script>`
- Check browser console for JavaScript errors
- Clear browser cache

### Session Not Persisting
- Ensure `session_start()` is called in `config.php`
- Check PHP session settings in `php.ini`
- Verify sessions folder has write permissions

## 📚 Learning Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [PHP Sessions](https://www.php.net/manual/en/book.session.php)
- [OAuth 2.0](https://tools.ietf.org/html/rfc6749)
- [JWT (JSON Web Tokens)](https://jwt.io/introduction)

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Share your improvements!

## ❓ FAQ

**Q: Can I use this in production?**
A: Yes! It has proper security measures. However, always keep your Client ID safe and update authorized URIs for your domain.

**Q: Does it work offline?**
A: No, Google authentication requires internet connection.

**Q: Can I store user data in a database?**
A: Yes, you can modify `auth.php` to also store user data in a database while keeping the session-based approach.

**Q: How long does the session last?**
A: By default, PHP sessions last until the browser closes. You can modify `config.php` to set a custom timeout.

---

**Happy coding! 🚀**

For updates and more projects, visit: https://github.com/rjilegaspi-glitch
