const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'meachyme@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password-here'
    }
});

// First Alert email endpoint
app.post('/api/first-alert', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is required' 
            });
        }

        // Email to send to meachyme@gmail.com
        const mailOptions = {
            from: process.env.EMAIL_USER || 'meachyme@gmail.com',
            to: 'meachyme@gmail.com',
            subject: 'New First Alert Signup - Chyme',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #DC2626;">New First Alert Signup</h2>
                    <p>A new user has signed up for First Alert notifications for Chyme.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">User Details:</h3>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Signup Date:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Source:</strong> Chyme Landing Page</p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        This email was automatically generated from the Chyme First Alert signup form.
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        console.log(`First Alert signup received: ${email}`);
        
        res.json({ 
            success: true, 
            message: 'Email sent successfully' 
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email' 
        });
    }
});

// Contact form email endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'meachyme@gmail.com',
            to: 'meachyme@gmail.com',
            subject: `Contact Form: ${subject || 'No Subject'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #DC2626;">New Contact Form Submission</h2>
                    <p>You have received a new message through the Chyme contact form.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-left: 4px solid #DC2626; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        This email was automatically generated from the Chyme contact form.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        console.log(`Contact form submission from: ${name} (${email})`);
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully' 
        });
        
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message' 
        });
    }
});

// Support form email endpoint
app.post('/api/support', async (req, res) => {
    try {
        const { name, email, issue, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'meachyme@gmail.com',
            to: 'meachyme@gmail.com',
            subject: `Support Request: ${issue || 'General Support'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #DC2626;">New Support Request</h2>
                    <p>You have received a new support request through the Chyme support form.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Support Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Issue Type:</strong> ${issue || 'General Support'}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-left: 4px solid #DC2626; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        This email was automatically generated from the Chyme support form.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        console.log(`Support request from: ${name} (${email})`);
        
        res.json({ 
            success: true, 
            message: 'Support request sent successfully' 
        });
        
    } catch (error) {
        console.error('Error sending support email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send support request' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Chyme Email Server is running',
        timestamp: new Date().toISOString()
    });
});

// Serve the main website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Chyme Email Server running on port ${PORT}`);
    console.log(`📧 Email will be sent to: meachyme@gmail.com`);
    console.log(`🌐 Website available at: http://localhost:${PORT}`);
});

module.exports = app;
