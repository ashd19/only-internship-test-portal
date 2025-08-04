const nodemailer = require('nodemailer');

// SMTP Configuration
const smtpConfig = {
  // Development configuration (Gmail)
  development: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  
  // Production configuration (SendGrid, AWS SES, etc.)
  production: {
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'apikey',
      pass: process.env.SMTP_PASS || 'your-sendgrid-api-key'
    }
  }
};

// Create transporter based on environment
const createTransporter = () => {
  const config = process.env.NODE_ENV === 'production' 
    ? smtpConfig.production 
    : smtpConfig.development;
    
  return nodemailer.createTransporter(config);
};

// Email templates with Yuga Yatra branding
const emailTemplates = {
  otp_verification: {
    subject: 'OTP for Login - OnlyInternship.in',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification - OnlyInternship.in</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #f59e0b 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .header p { color: white; margin: 5px 0 0 0; font-size: 14px; }
          .content { padding: 40px; }
          .otp-box { background: #f8f9fa; border: 3px solid #D4AF37; border-radius: 15px; padding: 30px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 48px; font-weight: bold; color: #D4AF37; letter-spacing: 8px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 12px; }
          .btn { display: inline-block; background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OnlyInternship.in</h1>
            <p>Yuga Yatra Retail (OPC) Private Limited</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">OTP Verification</h2>
            <p style="color: #666; text-align: center; font-size: 16px; margin-bottom: 30px;">
              Your One-Time Password for login verification:
            </p>
            
            <div class="otp-box">
              <div class="otp-code">${data.otp}</div>
            </div>
            
            <p style="color: #666; text-align: center; margin-bottom: 30px;">
              This OTP is valid for <strong>${data.expiryMinutes} minutes</strong>.
            </p>
            
            <div class="warning">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Security Notice:</strong> Never share this OTP with anyone. OnlyInternship.in will never ask for your OTP via phone or email.
              </p>
            </div>
            
            <p style="color: #666; text-align: center; font-size: 14px; margin-top: 30px;">
              If you didn't request this OTP, please ignore this email and contact support immediately.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 OnlyInternship.in - Yuga Yatra Retail (OPC) Private Limited</p>
            <p>For support: support@onlyinternship.in</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  
  test_results: {
    subject: (data) => `Test Results - ${data.passed ? 'PASSED' : 'FAILED'} - OnlyInternship.in`,
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Results - OnlyInternship.in</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #f59e0b 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .header p { color: white; margin: 5px 0 0 0; font-size: 14px; }
          .content { padding: 40px; }
          .result-box { border-radius: 15px; padding: 30px; text-align: center; margin: 30px 0; }
          .passed { background: #d4edda; border: 2px solid #c3e6cb; }
          .failed { background: #f8d7da; border: 2px solid #f5c6cb; }
          .details { background: #f8f9fa; border-radius: 10px; padding: 25px; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 12px; }
          .btn { display: inline-block; background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OnlyInternship.in</h1>
            <p>Yuga Yatra Retail (OPC) Private Limited</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Test Results</h2>
            <p style="color: #666; margin-bottom: 30px;">Dear <strong>${data.userName}</strong>,</p>
            
            <div class="result-box ${data.passed ? 'passed' : 'failed'}">
              <h3 style="color: ${data.passed ? '#155724' : '#721c24'}; margin: 0 0 15px 0; font-size: 24px;">
                ${data.passed ? '🎉 CONGRATULATIONS! YOU PASSED!' : '❌ TEST RESULT: FAILED'}
              </h3>
              <p style="color: ${data.passed ? '#155724' : '#721c24'}; margin: 0; font-size: 20px;">
                Score: <strong>${data.score}%</strong> (${data.correctAnswers}/${data.totalQuestions})
              </p>
            </div>
            
            <div class="details">
              <h4 style="color: #333; margin-top: 0;">Test Details:</h4>
              <ul style="color: #666; padding-left: 20px;">
                <li>Total Questions: ${data.totalQuestions}</li>
                <li>Correct Answers: ${data.correctAnswers}</li>
                <li>Time Taken: ${data.timeTaken}</li>
                <li>Percentile: ${data.percentile}</li>
                <li>Test Date: ${data.testDate}</li>
              </ul>
            </div>
            
            ${data.passed ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.certificateUrl}" class="btn">Download Certificate</a>
              </div>
            ` : `
              <div class="warning" style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="color: #856404; margin-top: 0;">Retry Information:</h4>
                <p style="color: #856404; margin: 5px 0;">Attempts remaining: <strong>${data.retryInfo.attemptsLeft}</strong></p>
                <p style="color: #856404; margin: 5px 0;">Next attempt available: <strong>${data.retryInfo.nextAttemptDate}</strong></p>
              </div>
            `}
          </div>
          
          <div class="footer">
            <p>© 2024 OnlyInternship.in - Yuga Yatra Retail (OPC) Private Limited</p>
            <p>For support: support@onlyinternship.in</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
};

// Send email function
const sendEmail = async (to, templateName, data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[templateName];
    
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }
    
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'OnlyInternship.in'}" <${process.env.FROM_EMAIL || 'noreply@onlyinternship.in'}>`,
      to: to,
      subject: typeof template.subject === 'function' ? template.subject(data) : template.subject,
      html: template.html(data)
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('SMTP configuration is valid');
    return true;
  } catch (error) {
    console.error('SMTP configuration error:', error);
    return false;
  }
};

module.exports = {
  createTransporter,
  emailTemplates,
  sendEmail,
  testEmailConfig
}; 