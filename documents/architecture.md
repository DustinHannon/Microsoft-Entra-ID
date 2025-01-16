# Architecture Documentation

This document describes the architecture and components of the Microsoft Entra ID Authentication application.

## System Overview

The application is a Node.js web application that implements Microsoft Entra ID (Azure AD) authentication. It provides a simple interface for users to sign in with their Microsoft accounts and view their profile information.

## Components

### 1. Express.js Web Server
- Handles HTTP requests and routing
- Serves static files
- Manages sessions and cookies
- Implements security middleware
- Handles authentication flow

### 2. Microsoft Authentication Library (MSAL)
- Manages OAuth 2.0 authentication flow
- Handles token acquisition and management
- Interacts with Microsoft Entra ID endpoints
- Manages user sessions and tokens

### 3. Frontend Components
- Login page (index.html)
  - Simple black background
  - Microsoft sign-in button
- Welcome page (welcome.html)
  - Displays user information
  - Provides sign-out functionality

### 4. Security Components
- Helmet middleware for security headers
- Rate limiting middleware
- Session management
- Error handling middleware
- Logging system (Winston)

## Authentication Flow

1. **Initial Request**
   - User visits the application
   - Server renders login page with Microsoft sign-in button

2. **Authentication Initiation**
   - User clicks "Sign in with Microsoft"
   - Application redirects to `/login` endpoint
   - MSAL generates auth URL with proper scopes
   - User is redirected to Microsoft login page

3. **Microsoft Authentication**
   - User authenticates with Microsoft credentials
   - Microsoft validates credentials
   - Redirects back to application callback URL

4. **Token Handling**
   - Application receives auth code at callback endpoint
   - MSAL exchanges code for access token
   - User information is extracted from token
   - Session is created with user details

5. **Post-Authentication**
   - User is redirected to welcome page
   - Frontend fetches user details from API
   - Displays user information

## Security Architecture

### Headers and Middleware
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- XSS Protection
- HSTS
- Referrer Policy

### Session Management
- Secure, HTTP-only cookies
- Session timeout
- Secure session storage
- CSRF protection

### Rate Limiting
- IP-based rate limiting
- Configurable windows and limits
- Protection against brute force attacks

### Error Handling
- Centralized error handling
- Secure error messages
- Detailed logging
- No sensitive information exposure

## Logging Architecture

### Winston Logger Configuration
- Multiple transport layers
- Different log levels
- Separate error logging
- Production/development configurations

### Logged Information
- HTTP requests (sanitized)
- Authentication events
- Error events
- System events

## Deployment Architecture

### GitHub Actions
- Automated deployment pipeline
- Environment variable management
- Azure Web App deployment
- Dependency installation
- Security checks

### Azure Web App
- Node.js runtime
- Environment configuration
- SSL/TLS encryption
- Azure platform security

## Configuration Management

### Environment Variables
- Client ID
- Tenant ID
- Client Secret
- Redirect URI
- Session Secret
- Other configuration options

### Security Considerations
- Secrets management
- GitHub Secrets integration
- Azure Key Vault (optional)
- Environment-specific configurations

## Scalability Considerations

- Stateless architecture
- Session store scalability
- Rate limiting per instance
- Logging aggregation
- Error handling across instances
