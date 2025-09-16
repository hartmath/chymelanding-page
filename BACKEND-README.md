# Chyme Email Server

A simple Node.js backend server to handle email sending for the Chyme landing page.

## Features

- ✅ **First Alert Email Collection** - Sends signup emails to meachyme@gmail.com
- ✅ **Contact Form Handling** - Processes contact form submissions
- ✅ **Support Form Handling** - Processes support requests
- ✅ **CORS Enabled** - Works with frontend from any domain
- ✅ **Professional Email Templates** - Beautiful HTML email formatting

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install express nodemailer cors

# For development (optional)
npm install -g nodemon
```

### 2. Gmail App Password Setup

**Important:** You need to set up a Gmail App Password to send emails.

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
EMAIL_USER=meachyme@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3001
```

### 4. Start the Server

```bash
# Production
node server.js

# Development (with auto-restart)
nodemon server.js
```

The server will start on `http://localhost:3001`

## API Endpoints

### First Alert Signup
```
POST /api/first-alert
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about Chyme",
  "message": "I have a question about..."
}
```

### Support Form
```
POST /api/support
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "issue": "Technical Issue",
  "message": "I'm having trouble with..."
}
```

### Health Check
```
GET /api/health
```

## Frontend Integration

Update your frontend JavaScript to send requests to the backend:

```javascript
// First Alert submission
async function handleFirstAlertSubmission(form) {
    const email = form.querySelector('#alertEmail').value;
    
    try {
        const response = await fetch('http://localhost:3001/api/first-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showFirstAlertSuccess();
        } else {
            console.error('Error:', result.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}
```

## Deployment

### Option 1: Heroku
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy with Git

### Option 2: Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Option 3: DigitalOcean/VPS
1. Upload files to server
2. Install Node.js and dependencies
3. Use PM2 for process management
4. Set up reverse proxy with Nginx

## Security Notes

- ✅ **Environment Variables** - Never commit .env file
- ✅ **CORS Configuration** - Configured for cross-origin requests
- ✅ **Input Validation** - Basic validation on all endpoints
- ✅ **Error Handling** - Proper error responses

## Troubleshooting

### Common Issues

1. **"Invalid login" error:**
   - Make sure you're using App Password, not regular password
   - Ensure 2FA is enabled on Gmail account

2. **CORS errors:**
   - Check that CORS is properly configured
   - Verify frontend is making requests to correct URL

3. **Port already in use:**
   - Change PORT in .env file
   - Kill existing process: `lsof -ti:3001 | xargs kill`

## Support

For issues with the email server, check:
1. Gmail App Password setup
2. Environment variables
3. Network connectivity
4. Server logs for error messages
