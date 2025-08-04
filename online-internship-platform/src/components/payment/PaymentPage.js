import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaCreditCard, 
  FaArrowLeft, 
  FaShieldAlt, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const testFee = 750;
  const gst = Math.round(testFee * 0.18); // 18% GST
  const totalAmount = testFee + gst;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions first');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to create order
      await new Promise(resolve => setTimeout(resolve, 1000));

      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Replace with actual Razorpay test key
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        name: 'OnlyInternship.in',
        description: 'Internship Assessment Test Fee - ₹750',
        image: '/logo.png',
        order_id: 'order_' + Date.now(),
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        notes: {
          address: 'Yuga Yatra Retail (OPC) Private Limited'
        },
        theme: {
          color: '#2C3E50'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (response) => {
    setLoading(false);
    setPaymentCompleted(true);
    toast.success('Payment successful! Please review the terms and conditions.');
  };

  const handlePaymentFailure = (error) => {
    setLoading(false);
    toast.error('Payment failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="flex items-center text-primary-dark hover:text-accent-red transition-colors mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </button>
              <YugaYatraLogo className="w-10 h-10" showText={false} />
              <h1 className="text-2xl font-bold text-primary-dark ml-3">Payment</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Details */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-6">Payment Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Test Fee</span>
                  <span className="font-medium">₹{testFee}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{gst}</span>
                </div>
                <div className="flex justify-between items-center py-3 text-lg font-semibold text-primary-dark">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-primary-dark mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-dark transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary-dark mr-3"
                    />
                    <FaCreditCard className="text-2xl text-primary-dark mr-3" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, MasterCard, RuPay</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-dark transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary-dark mr-3"
                    />
                    <FaCreditCard className="text-2xl text-primary-dark mr-3" />
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-dark transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary-dark mr-3"
                    />
                    <FaCreditCard className="text-2xl text-primary-dark mr-3" />
                    <div>
                      <p className="font-medium">Net Banking</p>
                      <p className="text-sm text-gray-600">All major banks</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions - Hidden before payment */}
              {!paymentCompleted && (
                <div className="mb-6">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="text-primary-dark mt-1 mr-3"
                    />
                    <div className="text-sm text-gray-700">
                      I agree to proceed with the payment of ₹{totalAmount} for the internship assessment test.
                    </div>
                  </label>
                </div>
              )}

              {/* Post-Payment Terms and Conditions */}
              {paymentCompleted && (
                <div className="mb-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ IMPORTANT - POST-PAYMENT TERMS</h4>
                    <div className="text-sm text-yellow-700 space-y-2">
                      <p><strong>NO REFUNDS POLICY:</strong> The test fee of ₹750 is completely non-refundable once payment is completed.</p>
                      <p><strong>Test Access:</strong> Your test will be enabled within 24 hours after admin approval.</p>
                      <p><strong>Test Duration:</strong> 30 minutes for 35 questions. No extensions allowed.</p>
                      <p><strong>Attempts:</strong> Maximum 3 attempts allowed per payment.</p>
                    </div>
                  </div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="text-primary-dark mt-1 mr-3"
                    />
                    <div className="text-sm text-gray-700">
                      I have read and understood the{' '}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-primary-dark hover:text-accent-red underline"
                      >
                        complete Terms & Conditions
                      </button>
                      {' '}and accept that the test fee is non-refundable.
                    </div>
                  </label>
                </div>
              )}

              {/* Pay Button */}
              {!paymentCompleted ? (
                <button
                  onClick={handlePayment}
                  disabled={loading || !acceptedTerms}
                  className="btn-primary w-full flex items-center justify-center py-4 text-lg"
                >
                  {loading ? (
                    <div className="spinner mr-2"></div>
                  ) : (
                    <FaCreditCard className="mr-2" />
                  )}
                  {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/student/dashboard')}
                  disabled={!acceptedTerms}
                  className="btn-primary w-full flex items-center justify-center py-4 text-lg"
                >
                  <FaCheckCircle className="mr-2" />
                  {acceptedTerms ? 'Proceed to Dashboard' : 'Accept Terms to Continue'}
                </button>
              )}
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Test Information */}
              <div className="card">
                <h3 className="text-lg font-semibold text-primary-dark mb-4">Test Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-success mr-3" />
                    <span>35 Questions (30 minutes)</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-success mr-3" />
                    <span>Instant results after completion</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-success mr-3" />
                    <span>Merit-based ranking system</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-success mr-3" />
                    <span>Certificate for passing candidates</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="card bg-blue-50 border border-blue-200">
                <div className="flex items-start">
                  <FaShieldAlt className="text-blue-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Secure Payment</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• SSL encrypted payment gateway</li>
                      <li>• PCI DSS compliant</li>
                      <li>• No card details stored</li>
                      <li>• Instant payment confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="card bg-red-50 border border-red-200">
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-red-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">NO REFUNDS POLICY</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Test fee of ₹750 is completely non-refundable</li>
                      <li>• No refunds for failed attempts or time expiration</li>
                      <li>• No refunds for technical issues during test</li>
                      <li>• Payment is final once completed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* GST Compliance */}
              <div className="card bg-green-50 border border-green-200">
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">GST Compliant</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Company: Yuga Yatra Retail (OPC) Private Limited</li>
                      <li>• GST Number: [To be added]</li>
                      <li>• Invoice will be generated automatically</li>
                      <li>• Tax invoice sent to your email</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Payment Terms & Conditions</h3>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ IMPORTANT - NO REFUNDS POLICY</h4>
                  <ul className="text-red-700 space-y-1">
                    <li>• Test fee of ₹750 is COMPLETELY NON-REFUNDABLE</li>
                    <li>• No refunds for failed attempts or time expiration</li>
                    <li>• No refunds for technical issues during test</li>
                    <li>• Payment is final once completed</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms:</h4>
                  <ul className="space-y-1">
                    <li>• Amount: ₹750 + 18% GST = ₹885</li>
                    <li>• Payment gateway: Razorpay (secure)</li>
                    <li>• Currency: Indian Rupees (INR)</li>
                    <li>• Invoice: Generated automatically</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Test Access:</h4>
                  <ul className="space-y-1">
                    <li>• Test enabled after admin approval</li>
                    <li>• Access valid for 30 days after payment</li>
                    <li>• Maximum 3 attempts allowed</li>
                    <li>• Results available immediately</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowTerms(false)}
                  className="btn-primary px-6 py-2"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage; 