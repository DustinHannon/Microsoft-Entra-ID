# Microsoft Entra ID Authentication Application

A secure Node.js web application implementing Microsoft Entra ID (Azure AD) authentication with a minimalist black interface.

## Features

- Single Sign-On with Microsoft Entra ID
- Secure session management
- Rate limiting and security headers
- Comprehensive logging
- Automated deployment to Azure Web App

## Prerequisites

- Node.js 18.x or later
- Microsoft Azure account
- Microsoft Entra ID (Azure AD) application registration
- Azure Web App service
- GitHub account (for deployment)

## Local Development Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
CLIENT_ID=your_client_id
TENANT_ID=your_tenant_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:3000/auth/callback
SESSION_SECRET=your_session_secret
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Microsoft Entra ID Setup

1. Go to the Azure Portal (https://portal.azure.com)
2. Navigate to Microsoft Entra ID > App registrations
3. Click "New registration"
4. Enter application details:
   - Name: Your app name
   - Supported account types: Single tenant
   - Redirect URI: http://localhost:3000/auth/callback (for development)
5. After registration, note down:
   - Application (client) ID
   - Directory (tenant) ID
6. Under "Certificates & secrets":
   - Create a new client secret
   - Copy the secret value immediately

## Environment Variables

| Variable | Description |
|----------|-------------|
| CLIENT_ID | Microsoft Entra ID Application (client) ID |
| TENANT_ID | Microsoft Entra ID Directory (tenant) ID |
| CLIENT_SECRET | Microsoft Entra ID client secret |
| REDIRECT_URI | Authentication callback URL |
| SESSION_SECRET | Secret for session encryption |

## GitHub Actions Deployment

### Required Secrets

Set the following secrets in your GitHub repository:

- AZURE_WEBAPP_NAME
- AZURE_WEBAPP_PUBLISH_PROFILE
- CLIENT_ID
- TENANT_ID
- CLIENT_SECRET
- REDIRECT_URI
- SESSION_SECRET

### Deployment Steps

1. Create an Azure Web App
2. Download the publish profile from Azure Web App
3. Add the publish profile content to GitHub Secrets as AZURE_WEBAPP_PUBLISH_PROFILE
4. Add other secrets as listed above
5. Push to main branch to trigger deployment

## Project Structure

```
├── .github/
│   └── workflows/
│       └── azure-deploy.yml
├── documents/
│   ├── api.md
│   ├── architecture.md
│   └── security.md
├── public/
│   ├── index.html
│   └── welcome.html
├── app.js
├── package.json
└── README.md
```

## Security Features

- Content Security Policy (CSP)
- Security headers via Helmet
- Rate limiting
- Secure session management
- Input validation
- Error handling
- Comprehensive logging

## Documentation

Detailed documentation is available in the `documents` folder:

- [API Documentation](documents/api.md)
- [Architecture Documentation](documents/architecture.md)
- [Security Documentation](documents/security.md)

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
