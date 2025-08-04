const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
  // For development/testing - use Gmail or other SMTP service
  development: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    }
  },
  
  // For production - use SendGrid, AWS SES, or other services
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
    ? emailConfig.production 
    : emailConfig.development;
    
  return nodemailer.createTransporter(config);
};

// Email templates
const emailTemplates = {
  otp_verification: {
    subject: 'OTP for Login - OnlyInternship.in',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #f59e0b 100%); padding: 20px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">OnlyInternship.in</h1>
          <p style="color: white; margin: 5px 0;">Yuga Yatra Retail (OPC) Private Limited</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; text-align: center;">OTP Verification</h2>
          <p style="color: #666; text-align: center; font-size: 16px;">Your One-Time Password for login verification:</p>
          
          <div style="background: #f8f9fa; border: 2px solid #D4AF37; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #D4AF37; letter-spacing: 5px;">${data.otp}</span>
          </div>
          
          <p style="color: #666; text-align: center;">This OTP is valid for <strong>${data.expiryMinutes} minutes</strong>.</p>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>Security Notice:</strong> Never share this OTP with anyone. OnlyInternship.in will never ask for your OTP via phone or email.
            </p>
          </div>
          
          <p style="color: #666; text-align: center; font-size: 14px;">
            If you didn't request this OTP, please ignore this email and contact support immediately.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 OnlyInternship.in - Yuga Yatra Retail (OPC) Private Limited</p>
          <p>For support: support@onlyinternship.in</p>
        </div>
      </div>
    `
  },
  
  test_results: {
    subject: (data) => `Test Results - ${data.passed ? 'PASSED' : 'FAILED'} - OnlyInternship.in`,
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #f59e0b 100%); padding: 20px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">OnlyInternship.in</h1>
          <p style="color: white; margin: 5px 0;">Yuga Yatra Retail (OPC) Private Limited</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; text-align: center;">Test Results</h2>
          <p style="color: #666;">Dear <strong>${data.userName}</strong>,</p>
          
          <div style="background: ${data.passed ? '#d4edda' : '#f8d7da'}; border: 1px solid ${data.passed ? '#c3e6cb' : '#f5c6cb'}; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="color: ${data.passed ? '#155724' : '#721c24'}; margin: 0 0 10px 0;">
              ${data.passed ? '🎉 CONGRATULATIONS! YOU PASSED!' : '❌ TEST RESULT: FAILED'}
            </h3>
            <p style="color: ${data.passed ? '#155724' : '#721c24'}; margin: 0; font-size: 18px;">
              Score: <strong>${data.score}%</strong> (${data.correctAnswers}/${data.totalQuestions})
            </p>
          </div>
          
          <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin: 20px 0;">
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
            <div style="text-align: center; margin: 20px 0;">
              <a href="${data.certificateUrl}" style="background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Download Certificate
              </a>
            </div>
          ` : `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <h4 style="color: #856404; margin-top: 0;">Retry Information:</h4>
              <p style="color: #856404; margin: 5px 0;">Attempts remaining: <strong>${data.retryInfo.attemptsLeft}</strong></p>
              <p style="color: #856404; margin: 5px 0;">Next attempt available: <strong>${data.retryInfo.nextAttemptDate}</strong></p>
            </div>
          `}
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 OnlyInternship.in - Yuga Yatra Retail (OPC) Private Limited</p>
          <p>For support: support@onlyinternship.in</p>
        </div>
      </div>
    `
  },
  
  payment_confirmation: {
    subject: 'Payment Confirmation - OnlyInternship.in',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #f59e0b 100%); padding: 20px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">OnlyInternship.in</h1>
          <p style="color: white; margin: 5px 0;">Yuga Yatra Retail (OPC) Private Limited</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; text-align: center;">Payment Confirmation</h2>
          <p style="color: #666;">Dear <strong>${data.userName}</strong>,</p>
          
          <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="color: #155724; margin: 0 0 10px 0;">✅ Payment Successful!</h3>
            <p style="color: #155724; margin: 0; font-size: 18px;">
              Amount: <strong>₹${data.amount}</strong>
            </p>
          </div>
          
          <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <h4 style="color: #333; margin-top: 0;">Payment Details:</h4>
            <ul style="color: #666; padding-left: 20px;">
              <li>Payment ID: ${data.paymentId}</li>
              <li>Order ID: ${data.orderId}</li>
              <li>Test Fee: ₹${data.testFee}</li>
              <li>GST Amount: ₹${data.gstAmount}</li>
              <li>Payment Date: ${data.paymentDate}</li>
            </ul>
          </div>
          
          <div style="background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <p style="color: #0066cc; margin: 0; font-weight: bold;">
              🎉 Your test has been enabled! You can now take your internship assessment.
            </p>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="${data.invoiceUrl}" style="background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Download Invoice
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 OnlyInternship.in - Yuga Yatra Retail (OPC) Private Limited</p>
          <p>For support: support@onlyinternship.in</p>
        </div>
      </div>
    `
  }
};

// Send email function
const sendEmail = async (to, templateName, data) => {
  try {
    // For development, simulate email sending
    if (process.env.NODE_ENV !== 'production') {
      console.log('=== EMAIL SIMULATION (Development Mode) ===');
      console.log('To:', to);
      console.log('Template:', templateName);
      console.log('Subject:', typeof emailTemplates[templateName].subject === 'function' ? emailTemplates[templateName].subject(data) : emailTemplates[templateName].subject);
      console.log('OTP:', data.otp || 'N/A');
      console.log('=== END EMAIL SIMULATION ===');
      
      // Simulate success
      return { success: true, messageId: `dev-${Date.now()}`, message: 'Email sent successfully (development mode)' };
    }
    
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
    // For development, don't throw error, just log it
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email error (development mode):', error.message);
      return { success: true, messageId: `dev-error-${Date.now()}`, message: 'Email simulation completed' };
    }
    throw error;
  }
};

module.exports = {
  createTransporter,
  emailTemplates,
  sendEmail
}; 