import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  userType: null, // 'student' or 'admin'
  isAuthenticated: false,
  loading: true,
  otpSent: false,
  otpVerified: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
        loading: false,
      };
    
    case 'SET_OTP_SENT':
      return { ...state, otpSent: action.payload };
    
    case 'SET_OTP_VERIFIED':
      return { ...state, otpVerified: action.payload };
    
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      return {
        ...initialState,
        loading: false,
      };
    
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');

    if (token && userType && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({
          type: 'SET_USER',
          payload: { user, userType },
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        dispatch({ type: 'LOGOUT' });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Send OTP for student login
  const sendOTP = async (email) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email
      dispatch({ type: 'SET_OTP_SENT', payload: true });
      toast.success('OTP sent to your email!');
      
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Verify OTP for student login
  const verifyOTP = async (email, otp) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6) {
        const user = {
          id: 'student_' + Date.now(),
          email,
          name: 'Student User',
          phone: '',
          college: '',
          profileComplete: false,
        };
        
        const token = 'student_token_' + Date.now();
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', 'student');
        localStorage.setItem('userData', JSON.stringify(user));
        
        dispatch({
          type: 'SET_USER',
          payload: { user, userType: 'student' },
        });
        
        dispatch({ type: 'SET_OTP_VERIFIED', payload: true });
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid OTP. Please try again.');
        return false;
      }
      
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.');
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Admin login
  const adminLogin = async (username, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin authentication with credentials: Admin/Admin
      if (username === 'Admin' && password === 'Admin') {
        const user = {
          id: 'admin_1',
          username: 'Admin',
          name: 'Administrator',
          role: 'admin',
        };
        
        const token = 'admin_token_' + Date.now();
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('userData', JSON.stringify(user));
        
        dispatch({
          type: 'SET_USER',
          payload: { user, userType: 'admin' },
        });
        
        toast.success('Admin login successful!');
        return true;
      } else {
        toast.error('Invalid credentials. Please try again.');
        return false;
      }
      
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...state.user, ...profileData, profileComplete: true };
      
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      dispatch({
        type: 'SET_USER',
        payload: { user: updatedUser, userType: state.userType },
      });
      
      toast.success('Profile updated successfully!');
      return true;
      
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      return false;
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully!');
  };

  const value = {
    ...state,
    sendOTP,
    verifyOTP,
    adminLogin,
    updateProfile,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 