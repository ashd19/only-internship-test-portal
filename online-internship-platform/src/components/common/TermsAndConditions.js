import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-soft border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-glow mr-4">
                <span className="text-white font-bold text-2xl">O</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-600 to-gold-700 bg-clip-text text-transparent">
                  OnlyInternship.in
                </h1>
                <p className="text-sm text-gray-500">Yuga Yatra Retail (OPC) Private Limited</p>
              </div>
            </div>
            <Link to="/" className="text-gray-600 hover:text-gold-600 transition-colors font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Terms and Conditions
          </h1>
          
          <div className="space-y-8">
            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-yellow-600 text-xl mr-3" />
                <h2 className="text-lg font-semibold text-yellow-800">Important Notice</h2>
              </div>
              <p className="text-yellow-700">
                By accessing and using OnlyInternship.in, you agree to be bound by these Terms and Conditions. 
                Please read them carefully before proceeding with your internship test.
              </p>
            </div>

            {/* Test Rules */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="text-gold-600 mr-3" />
                Test Rules and Regulations
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Electronic Device Policy</h3>
                  <p className="text-red-600 font-medium mb-2">⚠️ STRICT PROHIBITION:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>No headphones, earphones, or earbuds allowed during the test</li>
                    <li>No mobile phones or electronic devices near the test area</li>
                    <li>No external speakers or audio devices</li>
                    <li>No smartwatches or wearable devices</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Test Environment Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Quiet, well-lit environment with stable internet connection</li>
                    <li>No other applications or browser tabs open during the test</li>
                    <li>Camera must remain on throughout the test duration</li>
                    <li>No talking or communication with others during the test</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Test Structure */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaClock className="text-gold-600 mr-3" />
                Test Structure and Timing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gold-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">35</div>
                  <div className="text-gray-700 font-medium">Questions</div>
                </div>
                <div className="bg-gold-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">30</div>
                  <div className="text-gray-700 font-medium">Minutes</div>
                </div>
                <div className="bg-gold-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">3</div>
                  <div className="text-gray-700 font-medium">Attempts</div>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment and Refund Policy</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Test Fee</h3>
                  <p>₹250 (including GST) - Non-refundable once test is initiated</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Refund Eligibility</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Refund available only if test has not been started</li>
                    <li>Technical issues preventing test access</li>
                    <li>Payment processing errors</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Anti-Cheating Measures */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Anti-Cheating Measures</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Monitoring Systems</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Screen recording and monitoring</li>
                    <li>Tab switching detection</li>
                    <li>Right-click and keyboard shortcut prevention</li>
                    <li>Screenshot prevention</li>
                    <li>Inactivity detection with auto-submit</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Warning System</h3>
                  <p>Three warnings for suspicious activity. After the third warning, the test will be automatically submitted.</p>
                </div>
              </div>
            </section>

            {/* Results and Certificates */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Results and Certificates</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Passing Criteria</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Minimum 60% score required to pass</li>
                    <li>Instant results upon test completion</li>
                    <li>Email notification with detailed score breakdown</li>
                    <li>Merit list ranking based on percentile</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Personal data collected for test administration only</li>
                    <li>Test recordings stored securely for 30 days</li>
                    <li>No sharing of personal information with third parties</li>
                    <li>GDPR compliant data handling practices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Agreement */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By proceeding with the test, you acknowledge that you have read, understood, and agree to all the terms and conditions outlined above.
                </p>
                <p className="font-semibold text-gray-900">
                  Failure to comply with any of these terms may result in immediate test termination and disqualification.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gold-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Company:</strong> Yuga Yatra Retail (OPC) Private Limited</p>
                <p><strong>Website:</strong> onlyinternship.in</p>
                <p><strong>Email:</strong> support@onlyinternship.in</p>
                <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="btn-outline flex-1 text-center"
            >
              Back to Home
            </Link>
            <Link
              to="/student/login"
              className="btn-primary flex-1 text-center"
            >
              I Agree - Proceed to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 