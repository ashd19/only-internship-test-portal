import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTest } from '../../contexts/TestContext';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaEdit, 
  FaCheck, 
  FaTimes,
  FaClock,
  FaTrophy,
  FaFileAlt,
  FaExclamationTriangle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { startTest, loading } = useTest();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    college: user?.college || '',
  });

  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (!user?.profileComplete) {
      setIsEditing(true);
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!profileData.name || !profileData.phone || !profileData.college) {
      toast.error('Please fill in all required fields');
      return;
    }

    const success = await updateProfile(profileData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleStartTest = async () => {
    if (!user?.profileComplete) {
      toast.error('Please complete your profile first');
      setIsEditing(true);
      return;
    }

    setShowTerms(true);
  };

  const handleAcceptTerms = async () => {
    setShowTerms(false);
    const success = await startTest();
    if (success) {
      navigate('/student/test');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed across all pages */}
      <header className="bg-white shadow-lg border-b-2 border-gold-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Yuga Yatra Logo */}
              <YugaYatraLogo className="w-16 h-16" showText={false} />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Student Dashboard
                </h1>
                <p className="text-sm text-gold-600 font-medium">Welcome back, {user?.name || 'Student'}!</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-gray-700 hover:text-gold-600 transition-colors font-medium"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary-dark">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-accent-red hover:text-red-600 transition-colors"
                >
                  {isEditing ? <FaTimes /> : <FaEdit />}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="input-field"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      College/University *
                    </label>
                    <input
                      type="text"
                      value={profileData.college}
                      onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
                      className="input-field"
                      placeholder="Enter your college/university"
                    />
                  </div>
                  <button
                    onClick={handleProfileUpdate}
                    className="btn-primary w-full"
                  >
                    <FaCheck className="mr-2" />
                    Save Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{user?.name || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">College</p>
                      <p className="font-medium">{user?.college || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Test Information */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold text-primary-dark mb-6">Internship Assessment Test</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FaFileAlt className="text-3xl text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-800">35 Questions</h3>
                  <p className="text-sm text-blue-600">Comprehensive assessment</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <FaClock className="text-3xl text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-800">30 Minutes</h3>
                  <p className="text-sm text-green-600">Timed assessment</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FaTrophy className="text-3xl text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-800">Merit Based</h3>
                  <p className="text-sm text-purple-600">Percentile ranking</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Important Reminders</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• No electronic devices (earphones, earbuds) allowed during test</li>
                      <li>• Screenshots and screen recordings are prohibited</li>
                      <li>• Test fee: ₹250 + GST = ₹295 (non-refundable once started)</li>
                      <li>• Maximum 3 attempts allowed</li>
                      <li>• Passing criteria: 60% or higher</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartTest}
                disabled={loading || !user?.profileComplete}
                className="btn-primary w-full md:w-auto px-8 py-3 flex items-center justify-center"
              >
                {loading ? (
                  <div className="spinner mr-2"></div>
                ) : (
                  <FaFileAlt className="mr-2" />
                )}
                {loading ? 'Preparing Test...' : 'Start Test'}
              </button>
            </div>

            {/* Test History */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-6">Test History</h2>
              
              <div className="text-center py-8 text-gray-500">
                <FaFileAlt className="text-4xl mx-auto mb-4 text-gray-300" />
                <p>No test attempts yet</p>
                <p className="text-sm">Complete your first test to see your history here</p>
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
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Terms & Conditions</h3>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ CRITICAL WARNINGS</h4>
                  <ul className="text-red-700 space-y-1">
                    <li>• NO electronic devices (earphones, earbuds) during test</li>
                    <li>• NO screenshots or screen recordings</li>
                    <li>• NO switching between browser tabs/windows</li>
                    <li>• NO external help or communication</li>
                    <li>• 3 warnings = automatic test submission</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Test Rules:</h4>
                  <ul className="space-y-1">
                    <li>• Duration: 30 minutes (1800 seconds)</li>
                    <li>• Questions: 35 (Easy/Moderate/Expert mix)</li>
                    <li>• Passing: 60% or higher (21/35 correct)</li>
                    <li>• Fee: ₹295 (₹250 + GST) - Non-refundable</li>
                    <li>• Max attempts: 3</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowTerms(false)}
                  className="btn-outline px-6 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptTerms}
                  className="btn-primary px-6 py-2"
                >
                  Accept & Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard; 