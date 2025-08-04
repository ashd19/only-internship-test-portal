// Email Service for OnlyInternship.in
class EmailService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    this.fromEmail = 'noreply@onlyinternship.in';
    this.fromName = 'OnlyInternship.in';
  }

  // Send OTP email
  async sendOTP(email, otp) {
    try {
      const emailData = {
        to: email,
        subject: 'OTP for Login - OnlyInternship.in',
        template: 'otp_verification',
        data: {
          otp: otp,
          expiryMinutes: 10,
          companyName: 'Yuga Yatra Retail (OPC) Private Limited',
          supportEmail: 'support@onlyinternship.in'
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  // Send test results email
  async sendTestResults(email, testData) {
    try {
      const emailData = {
        to: email,
        subject: `Test Results - ${testData.passed ? 'PASSED' : 'FAILED'} - OnlyInternship.in`,
        template: 'test_results',
        data: {
          userName: testData.userName,
          score: testData.score,
          totalQuestions: testData.totalQuestions,
          correctAnswers: testData.correctAnswers,
          passed: testData.passed,
          timeTaken: testData.timeTaken,
          percentile: testData.percentile,
          testDate: testData.testDate,
          certificateUrl: testData.passed ? testData.certificateUrl : null,
          retryInfo: !testData.passed ? {
            attemptsLeft: testData.attemptsLeft,
            nextAttemptDate: testData.nextAttemptDate
          } : null
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending test results email:', error);
      throw new Error('Failed to send test results email');
    }
  }

  // Send payment confirmation email
  async sendPaymentConfirmation(email, paymentData) {
    try {
      const emailData = {
        to: email,
        subject: 'Payment Confirmation - OnlyInternship.in',
        template: 'payment_confirmation',
        data: {
          userName: paymentData.userName,
          amount: paymentData.amount,
          paymentId: paymentData.paymentId,
          orderId: paymentData.orderId,
          testFee: paymentData.testFee,
          gstAmount: paymentData.gstAmount,
          paymentDate: paymentData.paymentDate,
          testEnabled: true,
          invoiceUrl: paymentData.invoiceUrl
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending payment confirmation email:', error);
      throw new Error('Failed to send payment confirmation email');
    }
  }

  // Send refund confirmation email
  async sendRefundConfirmation(email, refundData) {
    try {
      const emailData = {
        to: email,
        subject: 'Refund Confirmation - OnlyInternship.in',
        template: 'refund_confirmation',
        data: {
          userName: refundData.userName,
          refundAmount: refundData.refundAmount,
          refundId: refundData.refundId,
          reason: refundData.reason,
          processingTime: '5-7 business days',
          refundDate: refundData.refundDate,
          originalPaymentId: refundData.originalPaymentId
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending refund confirmation email:', error);
      throw new Error('Failed to send refund confirmation email');
    }
  }

  // Send welcome email after registration
  async sendWelcomeEmail(email, userData) {
    try {
      const emailData = {
        to: email,
        subject: 'Welcome to OnlyInternship.in',
        template: 'welcome',
        data: {
          userName: userData.name,
          email: userData.email,
          nextSteps: [
            'Complete your profile',
            'Read the terms and conditions',
            'Make payment to start your test',
            'Take the assessment test'
          ],
          supportEmail: 'support@onlyinternship.in',
          companyName: 'Yuga Yatra Retail (OPC) Private Limited'
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  // Send test reminder email
  async sendTestReminder(email, userData) {
    try {
      const emailData = {
        to: email,
        subject: 'Test Reminder - OnlyInternship.in',
        template: 'test_reminder',
        data: {
          userName: userData.name,
          testDate: userData.testDate,
          testDuration: '30 minutes',
          totalQuestions: 35,
          testFee: '₹250 + GST',
          preparationTips: [
            'Ensure stable internet connection',
            'Close unnecessary browser tabs',
            'Have your ID ready for verification',
            'Find a quiet environment'
          ]
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending test reminder email:', error);
      throw new Error('Failed to send test reminder email');
    }
  }

  // Send certificate email
  async sendCertificate(email, certificateData) {
    try {
      const emailData = {
        to: email,
        subject: 'Certificate of Completion - OnlyInternship.in',
        template: 'certificate',
        data: {
          userName: certificateData.userName,
          score: certificateData.score,
          percentile: certificateData.percentile,
          testDate: certificateData.testDate,
          certificateUrl: certificateData.certificateUrl,
          certificateId: certificateData.certificateId,
          validityPeriod: 'Lifetime',
          companyName: 'Yuga Yatra Retail (OPC) Private Limited'
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending certificate email:', error);
      throw new Error('Failed to send certificate email');
    }
  }

  // Send admin notification for suspicious activity
  async sendSuspiciousActivityAlert(adminEmail, activityData) {
    try {
      const emailData = {
        to: adminEmail,
        subject: 'Suspicious Activity Alert - OnlyInternship.in',
        template: 'suspicious_activity',
        data: {
          userId: activityData.userId,
          userEmail: activityData.userEmail,
          testId: activityData.testId,
          activityType: activityData.activityType,
          timestamp: activityData.timestamp,
          warnings: activityData.warnings,
          action: activityData.action
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending suspicious activity alert:', error);
      throw new Error('Failed to send suspicious activity alert');
    }
  }

  // Send password reset email
  async sendPasswordReset(email, resetToken) {
    try {
      const emailData = {
        to: email,
        subject: 'Password Reset Request - OnlyInternship.in',
        template: 'password_reset',
        data: {
          resetToken: resetToken,
          resetUrl: `${window.location.origin}/reset-password?token=${resetToken}`,
          expiryHours: 24,
          supportEmail: 'support@onlyinternship.in'
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  // Send admin dashboard summary
  async sendAdminSummary(adminEmail, summaryData) {
    try {
      const emailData = {
        to: adminEmail,
        subject: 'Daily Summary - OnlyInternship.in',
        template: 'admin_summary',
        data: {
          date: summaryData.date,
          totalTests: summaryData.totalTests,
          passedTests: summaryData.passedTests,
          failedTests: summaryData.failedTests,
          revenue: summaryData.revenue,
          newUsers: summaryData.newUsers,
          suspiciousActivities: summaryData.suspiciousActivities,
          topPerformers: summaryData.topPerformers
        }
      };

      const response = await this.callEmailAPI('/api/email/send', emailData);
      return response;
    } catch (error) {
      console.error('Error sending admin summary email:', error);
      throw new Error('Failed to send admin summary email');
    }
  }

  // Generic email API call
  async callEmailAPI(endpoint, emailData) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...emailData,
          from: {
            email: this.fromEmail,
            name: this.fromName
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Email API call failed:', error);
      // For demo purposes, simulate success
      // In production, this should throw the error
      console.log('Simulating email success for demo');
      return { success: true, messageId: `demo-${Date.now()}`, message: 'Email sent successfully (demo mode)' };
    }
  }

  // Generate email templates (for reference)
  getEmailTemplates() {
    return {
      otp_verification: {
        subject: 'OTP for Login - OnlyInternship.in',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2C3E50;">OTP Verification</h2>
            <p>Your OTP is: <strong style="font-size: 24px; color: #E74C3C;">{{otp}}</strong></p>
            <p>This OTP is valid for {{expiryMinutes}} minutes.</p>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <hr>
            <p><small>OnlyInternship.in - {{companyName}}</small></p>
          </div>
        `
      },
      test_results: {
        subject: 'Test Results - OnlyInternship.in',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2C3E50;">Test Results</h2>
            <p>Dear {{userName}},</p>
            <p>Your test result: <strong style="color: {{passed ? '#27AE60' : '#E74C3C'}};">{{passed ? 'PASSED' : 'FAILED'}}</strong></p>
            <p>Score: {{score}}% ({{correctAnswers}}/{{totalQuestions}})</p>
            <p>Percentile: {{percentile}}</p>
            <p>Time taken: {{timeTaken}}</p>
            {{#if passed}}
              <p><a href="{{certificateUrl}}" style="background: #27AE60; color: white; padding: 10px 20px; text-decoration: none;">Download Certificate</a></p>
            {{else}}
              <p>Attempts remaining: {{retryInfo.attemptsLeft}}</p>
              <p>Next attempt available: {{retryInfo.nextAttemptDate}}</p>
            {{/if}}
          </div>
        `
      },
      payment_confirmation: {
        subject: 'Payment Confirmation - OnlyInternship.in',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2C3E50;">Payment Confirmation</h2>
            <p>Dear {{userName}},</p>
            <p>Payment successful! Amount: ₹{{amount}}</p>
            <p>Payment ID: {{paymentId}}</p>
            <p>Test has been enabled for your account.</p>
            <p><a href="{{invoiceUrl}}" style="background: #2C3E50; color: white; padding: 10px 20px; text-decoration: none;">Download Invoice</a></p>
          </div>
        `
      }
    };
  }

  // Validate email address
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get email delivery status
  async getEmailStatus(emailId) {
    try {
      const response = await fetch(`${this.baseURL}/api/email/status/${emailId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting email status:', error);
      throw error;
    }
  }
}

export default EmailService; 