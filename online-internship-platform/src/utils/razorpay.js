// Razorpay Payment Integration
class RazorpayPayment {
  constructor() {
    this.key = process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_YOUR_KEY_HERE';
    this.secret = process.env.REACT_APP_RAZORPAY_SECRET || 'YOUR_SECRET_HERE';
    this.currency = 'INR';
    this.testFee = 250;
    this.gstRate = 0.18; // 18% GST
  }

  // Calculate total amount with GST
  calculateTotal() {
    const gstAmount = Math.round(this.testFee * this.gstRate);
    return this.testFee + gstAmount;
  }

  // Create payment order
  async createOrder(testId, userData) {
    try {
      const amount = this.calculateTotal();
      
      // In production, this would be a backend API call
      const orderData = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: this.currency,
        receipt: `test_${testId}_${Date.now()}`,
        notes: {
          testId: testId,
          userId: userData.id,
          userEmail: userData.email,
          testType: 'internship_assessment'
        },
        prefill: {
          name: userData.name || '',
          email: userData.email,
          contact: userData.phone || ''
        }
      };

      // Simulate API call to backend
      const response = await this.callBackendAPI('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });

      return response;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  // Initialize payment
  async initializePayment(orderData, userData) {
    try {
      const options = {
        key: this.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'OnlyInternship.in',
        description: 'Internship Assessment Test Fee',
        image: '/logo.png',
        order_id: orderData.id,
        handler: (response) => {
          this.handlePaymentSuccess(response, orderData);
        },
        prefill: {
          name: userData.name || '',
          email: userData.email,
          contact: userData.phone || ''
        },
        notes: {
          address: 'Yuga Yatra Retail (OPC) Private Limited'
        },
        theme: {
          color: '#2C3E50'
        },
        modal: {
          ondismiss: () => {
            this.handlePaymentDismiss();
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      return rzp;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw new Error('Failed to initialize payment');
    }
  }

  // Handle successful payment
  async handlePaymentSuccess(response, orderData) {
    try {
      console.log('Payment successful:', response);

      // Verify payment with backend
      const verificationData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        orderId: orderData.id
      };

      const verificationResponse = await this.callBackendAPI('/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify(verificationData)
      });

      if (verificationResponse.verified) {
        // Enable test for user
        await this.enableTest(orderData.notes.testId, orderData.notes.userId);
        
        // Send confirmation email
        await this.sendPaymentConfirmation(orderData.notes.userEmail, response);
        
        return {
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          amount: orderData.amount / 100
        };
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw error;
    }
  }

  // Handle payment dismissal
  handlePaymentDismiss() {
    console.log('Payment dismissed by user');
    // Could trigger a callback to update UI
  }

  // Enable test after successful payment
  async enableTest(testId, userId) {
    try {
      const response = await this.callBackendAPI('/api/tests/enable', {
        method: 'POST',
        body: JSON.stringify({
          testId: testId,
          userId: userId,
          enabledAt: new Date().toISOString()
        })
      });

      return response;
    } catch (error) {
      console.error('Error enabling test:', error);
      throw error;
    }
  }

  // Send payment confirmation email
  async sendPaymentConfirmation(userEmail, paymentData) {
    try {
      const emailData = {
        to: userEmail,
        subject: 'Payment Confirmation - OnlyInternship.in',
        template: 'payment_confirmation',
        data: {
          amount: this.calculateTotal(),
          paymentId: paymentData.razorpay_payment_id,
          testFee: this.testFee,
          gstAmount: Math.round(this.testFee * this.gstRate),
          testEnabled: true
        }
      };

      await this.callBackendAPI('/api/email/send', {
        method: 'POST',
        body: JSON.stringify(emailData)
      });
    } catch (error) {
      console.error('Error sending payment confirmation:', error);
      // Don't throw error as email is not critical
    }
  }

  // Process refund (admin only)
  async processRefund(paymentId, reason, adminId) {
    try {
      // Check if test was initiated
      const testStatus = await this.getTestStatus(paymentId);
      
      if (testStatus.testInitiated) {
        throw new Error('Cannot refund - test has already been initiated');
      }

      const refundData = {
        paymentId: paymentId,
        reason: reason,
        adminId: adminId,
        refundAmount: this.calculateTotal()
      };

      const response = await this.callBackendAPI('/api/payments/refund', {
        method: 'POST',
        body: JSON.stringify(refundData)
      });

      if (response.refundId) {
        // Send refund confirmation email
        await this.sendRefundConfirmation(testStatus.userEmail, response);
      }

      return response;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  // Get test status for refund eligibility
  async getTestStatus(paymentId) {
    try {
      const response = await this.callBackendAPI(`/api/tests/status/${paymentId}`, {
        method: 'GET'
      });

      return response;
    } catch (error) {
      console.error('Error getting test status:', error);
      throw error;
    }
  }

  // Send refund confirmation email
  async sendRefundConfirmation(userEmail, refundData) {
    try {
      const emailData = {
        to: userEmail,
        subject: 'Refund Confirmation - OnlyInternship.in',
        template: 'refund_confirmation',
        data: {
          refundAmount: refundData.refundAmount,
          refundId: refundData.refundId,
          reason: refundData.reason,
          processingTime: '5-7 business days'
        }
      };

      await this.callBackendAPI('/api/email/send', {
        method: 'POST',
        body: JSON.stringify(emailData)
      });
    } catch (error) {
      console.error('Error sending refund confirmation:', error);
    }
  }

  // Get payment history for user
  async getPaymentHistory(userId) {
    try {
      const response = await this.callBackendAPI(`/api/payments/history/${userId}`, {
        method: 'GET'
      });

      return response;
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw error;
    }
  }

  // Generate invoice
  async generateInvoice(paymentId) {
    try {
      const response = await this.callBackendAPI(`/api/payments/invoice/${paymentId}`, {
        method: 'GET'
      });

      return response;
    } catch (error) {
      console.error('Error generating invoice:', error);
      throw error;
    }
  }

  // Webhook handler for payment events
  async handleWebhook(event, signature) {
    try {
      // Verify webhook signature
      const verified = this.verifyWebhookSignature(event, signature);
      
      if (!verified) {
        throw new Error('Invalid webhook signature');
      }

      const eventData = JSON.parse(event);
      
      switch (eventData.event) {
        case 'payment.captured':
          await this.handlePaymentCaptured(eventData.payload);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(eventData.payload);
          break;
        case 'refund.processed':
          await this.handleRefundProcessed(eventData.payload);
          break;
        default:
          console.log('Unhandled webhook event:', eventData.event);
      }

      return { success: true };
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw error;
    }
  }

  // Handle payment captured webhook
  async handlePaymentCaptured(payload) {
    try {
      const payment = payload.payment.entity;
      
      // Update payment status in database
      await this.callBackendAPI('/api/payments/webhook/captured', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log('Payment captured:', payment.id);
    } catch (error) {
      console.error('Error handling payment captured:', error);
    }
  }

  // Handle payment failed webhook
  async handlePaymentFailed(payload) {
    try {
      const payment = payload.payment.entity;
      
      // Update payment status and notify user
      await this.callBackendAPI('/api/payments/webhook/failed', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log('Payment failed:', payment.id);
    } catch (error) {
      console.error('Error handling payment failed:', error);
    }
  }

  // Handle refund processed webhook
  async handleRefundProcessed(payload) {
    try {
      const refund = payload.refund.entity;
      
      // Update refund status in database
      await this.callBackendAPI('/api/payments/webhook/refund', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log('Refund processed:', refund.id);
    } catch (error) {
      console.error('Error handling refund processed:', error);
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(event, signature) {
    // In production, implement proper signature verification
    // using crypto module and Razorpay secret
    return true; // Placeholder
  }

  // Generic backend API call
  async callBackendAPI(endpoint, options = {}) {
    try {
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const url = `${baseURL}${endpoint}`;
      
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      };

      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Get payment details
  async getPaymentDetails(paymentId) {
    try {
      const response = await this.callBackendAPI(`/api/payments/${paymentId}`, {
        method: 'GET'
      });

      return response;
    } catch (error) {
      console.error('Error getting payment details:', error);
      throw error;
    }
  }

  // Get GST breakdown
  getGSTBreakdown() {
    const gstAmount = Math.round(this.testFee * this.gstRate);
    return {
      testFee: this.testFee,
      gstRate: this.gstRate * 100, // 18%
      gstAmount: gstAmount,
      total: this.testFee + gstAmount
    };
  }
}

export default RazorpayPayment; 