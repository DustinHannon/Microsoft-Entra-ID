# API Documentation

This document outlines the API endpoints available in the Microsoft Entra ID Authentication application.

## Endpoints

### GET /api/user
Returns information about the currently authenticated user.

**Authentication Required:** Yes

**Response Format:**
```json
{
    "name": "string",
    "username": "string"
}
```

**Example Response:**
```json
{
    "name": "John Doe",
    "username": "john.doe@company.com"
}
```

**Error Responses:**
- 401 Unauthorized: If the user is not authenticated
```json
{
    "error": "Not authenticated"
}
```

## Authentication Routes

### GET /login
Initiates the Microsoft Entra ID authentication flow.

### GET /auth/callback
Handles the callback from Microsoft Entra ID after successful authentication.

### GET /logout
Logs out the current user and destroys their session.

## Security Considerations

1. All endpoints use secure session management
2. Rate limiting is applied to prevent abuse
3. CSRF protection is implemented through secure session cookies
4. All responses include appropriate security headers
5. Input validation and sanitization are implemented
6. Error responses do not expose sensitive information

## Rate Limiting

The API implements rate limiting with the following constraints:
- 100 requests per 15-minute window per IP address
- Exceeding this limit will result in a 429 (Too Many Requests) response

## Error Handling

All endpoints follow a consistent error handling pattern:
- Client errors (4xx) include a descriptive message
- Server errors (5xx) are logged but return a generic message
- All errors are properly logged for monitoring and debugging

## Monitoring and Logging

The application uses Winston for logging:
- All API requests are logged (excluding sensitive data)
- Errors are logged with stack traces
- Separate log files for errors and combined logs
