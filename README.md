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

#### Application Secrets
- CLIENT_ID (Microsoft Entra ID Application Client ID)
- TENANT_ID (Microsoft Entra ID Tenant ID)
- CLIENT_SECRET (Microsoft Entra ID Client Secret)
- REDIRECT_URI (Authentication callback URL)
- SESSION_SECRET (Session encryption key)

#### Azure Deployment Secrets
- AZURE_WEBAPP_NAME (Name of your Azure Web App)
- AZURE_CLIENT_ID (Azure service principal client ID)
- AZURE_TENANT_ID (Azure tenant ID)
- AZURE_SUBSCRIPTION_ID (Azure subscription ID)

### Deployment Steps

1. Create an Azure Web App in the Azure Portal
2. Create an Azure service principal for GitHub Actions:
   ```bash
   az ad sp create-for-rbac --name "myapp-deployer" --role contributor \
                           --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
                           --sdk-auth
   ```
3. Add the service principal details to GitHub Secrets:
   - AZURE_CLIENT_ID: service principal client ID
   - AZURE_TENANT_ID: service principal tenant ID
   - AZURE_SUBSCRIPTION_ID: Azure subscription ID
4. Add the application secrets to GitHub Secrets
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
