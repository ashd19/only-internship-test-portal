import React from 'react';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaCode
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#261E15] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* YugaYatra Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#D4AF37]">YugaYatra</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Empowering retail excellence through innovative solutions and comprehensive training programs. Building the future of retail, one professional at a time.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3A2F1F] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <FaLinkedin className="text-white text-sm sm:text-base" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3A2F1F] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <FaTwitter className="text-white text-sm sm:text-base" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3A2F1F] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <FaInstagram className="text-white text-sm sm:text-base" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3A2F1F] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <FaFacebook className="text-white text-sm sm:text-base" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3A2F1F] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <FaYoutube className="text-white text-sm sm:text-base" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['About Us', 'Our Programs', 'Careers', 'Success Stories', 'Achievements', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center text-sm sm:text-base">
                    <FaArrowRight className="mr-2 text-xs sm:text-sm flex-shrink-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37]">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-1 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">Electronic City, Phase 1, Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-[#D4AF37] mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-300 text-sm sm:text-base">+91 8757728679</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-[#D4AF37] mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-300 text-sm sm:text-base break-all">yugayatra@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Stay Updated Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37]">Stay Updated</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#3A2F1F] border border-[#D4AF37] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm sm:text-base"
              />
              <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-lg hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Contact Section */}
      <div className="border-t border-[#3A2F1F] bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <FaCode className="text-[#D4AF37] text-lg sm:text-xl" />
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-[#D4AF37] font-semibold text-sm sm:text-base">Developer Contact</span>
                <span className="text-gray-300 ml-0 sm:ml-2 text-sm sm:text-base">Ganesh Lagad</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <a href="mailto:ganeshlagad2005@gmail.com" className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center text-sm sm:text-base">
                <FaEnvelope className="mr-2 text-sm" />
                <span className="break-all">ganeshlagad2005@gmail.com</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center text-sm sm:text-base">
                <FaLinkedin className="mr-2 text-sm" />
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center text-sm sm:text-base">
                <FaCode className="mr-2 text-sm" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#1A1510] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2024 Yuga Yatra Retail (OPC) Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 