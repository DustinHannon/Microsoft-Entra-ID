// Import required dependencies
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const session = require('express-session');
const helmet = require('helmet'); // Security middleware
const morgan = require('morgan'); // HTTP request logger
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const winston = require('winston'); // Logging
const msal = require('@azure/msal-node');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Add console logging if not in production
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Configure rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Configure MSAL
const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message) {
                logger.info(message);
            },
            piiLoggingEnabled: false,
            logLevel: "Info",
        }
    }
};

// Create MSAL application object
const cca = new msal.ConfidentialClientApplication(msalConfig);

// Middleware setup
app.use(helmet()); // Security headers
app.use(morgan('combined')); // HTTP request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use(limiter); // Apply rate limiting

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-super-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true, // Prevent XSS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Authentication routes
const authConfig = {
    scopes: ["user.read"], // Microsoft Graph API scope for reading user profile
};

// Home route - renders login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login route - initiates auth flow
app.get('/login', async (req, res) => {
    try {
        // Generate PKCE codes before authorization request
        const authCodeUrlParameters = {
            scopes: authConfig.scopes,
            redirectUri: process.env.REDIRECT_URI,
        };

        // Get URL to sign user in and consent to scopes needed for application
        const response = await cca.getAuthCodeUrl(authCodeUrlParameters);
        res.redirect(response);
    } catch (error) {
        logger.error('Error during login:', error);
        res.status(500).send('Error occurred during login');
    }
});

// Callback route - handles the response from Azure AD
app.get('/auth/callback', async (req, res) => {
    try {
        const tokenRequest = {
            code: req.query.code,
            scopes: authConfig.scopes,
            redirectUri: process.env.REDIRECT_URI,
        };

        const response = await cca.acquireTokenByCode(tokenRequest);
        
        // Store user information in session
        req.session.user = {
            name: response.account.name,
            username: response.account.username
        };

        // Redirect to welcome page
        res.redirect('/welcome');
    } catch (error) {
        logger.error('Error during token acquisition:', error);
        res.status(500).send('Error occurred during authentication');
    }
});

// Welcome route - shows authenticated user info
app.get('/welcome', (req, res) => {
    // Check if user is authenticated
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

// API route to get user info
app.get('/api/user', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json(req.session.user);
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).send('An unexpected error occurred');
});

// Start server
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
    console.log(`Server running on port ${port}`);
});
