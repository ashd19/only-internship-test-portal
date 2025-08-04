import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const TermsAgreement = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-light-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-primary-dark hover:text-accent-red transition-colors mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-primary-dark mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Please read these terms carefully before taking the test
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">
              OnlyInternship.in - Test Terms & Conditions
            </h2>

            <div className="space-y-6">
              {/* Important Warnings */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-red-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      ⚠️ IMPORTANT WARNINGS
                    </h3>
                    <ul className="text-red-700 space-y-2">
                      <li>• <strong>NO ELECTRONIC DEVICES:</strong> Do not use earphones, earbuds, or any electronic devices during the test</li>
                      <li>• <strong>NO SCREENSHOTS:</strong> Taking screenshots or screen recordings is strictly prohibited</li>
                      <li>• <strong>NO CHEATING:</strong> Any form of cheating will result in immediate disqualification</li>
                      <li>• <strong>NO MULTIPLE WINDOWS:</strong> Do not switch between browser tabs or windows</li>
                      <li>• <strong>NO EXTERNAL HELP:</strong> Do not seek help from others during the test</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Test Rules */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">
                  Test Rules & Regulations
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Test duration: 30 minutes (1800 seconds)</li>
                  <li>• Total questions: 35 (mix of Easy, Moderate, and Expert difficulty)</li>
                  <li>• Passing criteria: 60% or higher (21 correct answers out of 35)</li>
                  <li>• Maximum attempts: 3 attempts per candidate</li>
                  <li>• Test fee: ₹250 + GST (₹295 total) - Non-refundable</li>
                  <li>• Results are displayed immediately after test completion</li>
                  <li>• Merit list is based on percentile ranking</li>
                </ul>
              </div>

              {/* Anti-Cheating Measures */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">
                  Anti-Cheating Measures
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• <strong>3-Strike System:</strong> 3 warnings for suspicious activity will auto-submit the test</li>
                  <li>• <strong>Activity Monitoring:</strong> All user activities are monitored and logged</li>
                  <li>• <strong>Auto-Save:</strong> Answers are automatically saved every 30 seconds</li>
                  <li>• <strong>Page Protection:</strong> Right-click and keyboard shortcuts are disabled</li>
                  <li>• <strong>Timer Enforcement:</strong> Test auto-submits when time expires</li>
                  <li>• <strong>Recovery System:</strong> Test can be resumed if interrupted</li>
                </ul>
              </div>

              {/* Payment & Refund Policy */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">
                  Payment & Refund Policy
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• <strong>Test Fee:</strong> ₹250 + 18% GST = ₹295</li>
                  <li>• <strong>Payment Gateway:</strong> Razorpay (secure and GST compliant)</li>
                  <li>• <strong>Non-Refundable:</strong> Test fee is non-refundable once test is initiated</li>
                  <li>• <strong>Refund Eligibility:</strong> Refund available only if test is not started</li>
                  <li>• <strong>Technical Issues:</strong> Full refund for technical problems preventing test start</li>
                  <li>• <strong>Processing Time:</strong> Refunds processed within 5-7 business days</li>
                </ul>
              </div>

              {/* Privacy & Data Protection */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">
                  Privacy & Data Protection
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• <strong>Data Collection:</strong> We collect only necessary information for test administration</li>
                  <li>• <strong>Data Security:</strong> All data is encrypted and stored securely</li>
                  <li>• <strong>Data Usage:</strong> Data is used only for test evaluation and merit ranking</li>
                  <li>• <strong>Data Retention:</strong> Test data is retained for 1 year for verification purposes</li>
                  <li>• <strong>GDPR Compliance:</strong> We comply with data protection regulations</li>
                </ul>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">
                  Company Information
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• <strong>Company:</strong> Yuga Yatra Retail (OPC) Private Limited</li>
                  <li>• <strong>Platform:</strong> OnlyInternship.in</li>
                  <li>• <strong>GST Number:</strong> [GST Number to be added]</li>
                  <li>• <strong>Contact:</strong> support@onlyinternship.in</li>
                  <li>• <strong>Address:</strong> [Company Address to be added]</li>
                </ul>
              </div>

              {/* Acceptance */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      Acceptance of Terms
                    </h3>
                    <p className="text-green-700 mb-4">
                      By proceeding with the test, you acknowledge that you have read, understood, and agree to all the terms and conditions stated above.
                    </p>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="accept-terms"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
                      />
                      <label htmlFor="accept-terms" className="ml-2 text-sm text-green-700">
                        I have read and agree to the Terms & Conditions
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="btn-outline px-8 py-3"
          >
            Back to Home
          </Link>
          {accepted && (
            <Link
              to="/student/dashboard"
              className="btn-primary px-8 py-3"
            >
              Proceed to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement; 