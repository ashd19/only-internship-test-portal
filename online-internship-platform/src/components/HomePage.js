import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUserShield, FaClock, FaBars, FaTimes } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import YugaYatraLogo from './common/YugaYatraLogo';
import ChatBot from './chatbot.js';
const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 
  return (
    <div className="min-h-screen bg-white">
      

      {/* Header - Fixed across all pages */}
      <header className="bg-white shadow-lg border-b-2 border-gold-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Yuga Yatra Logo */}
              <YugaYatraLogo className="w-16 h-16" showText={true} />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/terms-conditions" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                Terms & Conditions
              </Link>
              <Link to="/student/login" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                Student Login
              </Link>
              <Link to="/admin/login" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                Admin Login
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gold-600 focus:outline-none focus:text-gold-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gold-200 shadow-lg">
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gold-50 transition-colors font-medium rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/terms-conditions" 
                  className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gold-50 transition-colors font-medium rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Terms & Conditions
                </Link>
                <Link 
                  to="/student/login" 
                  className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gold-50 transition-colors font-medium rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Student Login
                </Link>
                <Link 
                  to="/admin/login" 
                  className="block px-3 py-2 text-gray-700 hover:text-gold-600 hover:bg-gold-50 transition-colors font-medium rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
        
        <ChatBot />
      {/* Hero Section - Matching Yuga Yatra Retail style */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gold-50 via-white to-gold-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-200/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Online Internship Test Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
            Take your internship assessment online with our secure, proctored testing platform. 
            Get instant results and merit-based rankings.
          </p>
          
          {/* Test Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gold-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">35 Questions</h3>
              <p className="text-gray-600">Comprehensive assessment</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gold-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">30 Minutes</h3>
              <p className="text-gray-600">Timed assessment</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gold-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdPayment className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">₹250 + GST</h3>
              <p className="text-gray-600">One-time fee</p>
            </div>
          </div>

          {/* Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/student/login"
              className="bg-gold-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gold-600 hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-3"
            >
              <FaGraduationCap className="text-2xl" />
              <span>Student Login</span>
            </Link>
            <Link
              to="/admin/login"
              className="bg-gray-800 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-3"
            >
              <FaUserShield className="text-2xl" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern Timeline Design */}
      <section className="py-20 bg-gradient-to-b from-white to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gold-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="bg-gold-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white relative z-10">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Register & Login</h3>
                  <p className="text-gray-600 text-sm">
                    Create your account with email verification and secure OTP authentication.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="bg-gold-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white relative z-10">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Profile</h3>
                  <p className="text-gray-600 text-sm">
                    Fill in your details and agree to terms before proceeding to the test.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="bg-gold-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white relative z-10">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Take the Test</h3>
                  <p className="text-gray-600 text-sm">
                    Complete 35 questions in 30 minutes with secure anti-cheating monitoring.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="text-center relative">
                <div className="bg-gold-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white relative z-10">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Results</h3>
                  <p className="text-gray-600 text-sm">
                    Receive instant results with detailed analysis and merit-based ranking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Matching Yuga Yatra Retail style */}
      <footer className="bg-white border-t-2 border-gold-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-lg mr-4 border-2 border-gold-300">
                  <span className="text-white font-bold text-xl">Y</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    OnlyInternship.in
                  </h3>
                  <p className="text-sm text-gold-600 font-medium">Yuga Yatra Retail (OPC) Private Limited</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure online internship assessment platform with advanced anti-cheating technology 
                and instant results for merit-based rankings. Professional testing solutions for 
                modern educational needs.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/student/login" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                    Student Login
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">support@onlyinternship.in</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">+91-XXXXXXXXXX</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium">Address:</span>
                  <span className="ml-2">Yuga Yatra Retail (OPC) Private Limited</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gold-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm font-medium">
              © 2024 OnlyInternship.in. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-700 text-sm font-medium">GST Compliant</span>
              <span className="text-gold-500">•</span>
              <span className="text-gray-700 text-sm font-medium">Secure Platform</span>
              <span className="text-gold-500">•</span>
              <span className="text-gray-700 text-sm font-medium">Anti-Cheating</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 