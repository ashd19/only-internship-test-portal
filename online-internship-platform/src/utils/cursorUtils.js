// Import React hooks for the custom hook
import React, { useState, useCallback } from 'react';

// Utility functions for custom cursor integration

/**
 * Wraps a function with loading cursor functionality
 * @param {Function} asyncFunction - The async function to wrap
 * @param {Function} setLoading - Optional loading state setter
 * @returns {Function} Wrapped function that shows loading cursor
 */
export const withLoadingCursor = (asyncFunction, setLoading = null) => {
  return async (...args) => {
    // Dispatch loading start event
    window.dispatchEvent(new CustomEvent('loading-start'));
    
    if (setLoading) {
      setLoading(true);
    }
    
    try {
      const result = await asyncFunction(...args);
      return result;
    } finally {
      // Dispatch loading end event
      window.dispatchEvent(new CustomEvent('loading-end'));
      
      if (setLoading) {
        setLoading(false);
      }
    }
  };
};

/**
 * Creates a loading cursor wrapper for form submissions
 * @param {Function} onSubmit - Form submission handler
 * @returns {Function} Wrapped form submission handler
 */
export const withFormLoading = (onSubmit) => {
  return async (formData) => {
    window.dispatchEvent(new CustomEvent('loading-start'));
    
    try {
      await onSubmit(formData);
    } finally {
      window.dispatchEvent(new CustomEvent('loading-end'));
    }
  };
};

/**
 * Enhances fetch requests with loading cursor
 * @param {string} url - Request URL
 * @param {Object} options - Fetch options
 * @returns {Promise} Enhanced fetch promise
 */
export const fetchWithLoading = async (url, options = {}) => {
  window.dispatchEvent(new CustomEvent('loading-start'));
  
  try {
    const response = await fetch(url, options);
    return response;
  } finally {
    window.dispatchEvent(new CustomEvent('loading-end'));
  }
};

/**
 * Creates a clickable element with cursor hover effects
 * @param {React.Component} Component - Component to enhance
 * @returns {React.Component} Enhanced component
 */
export const withCursorHover = (Component) => {
  return React.forwardRef((props, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={`${props.className || ''} clickable`}
      />
    );
  });
};

/**
 * Adds loading cursor to navigation
 * @param {Function} navigate - Navigation function
 * @returns {Function} Enhanced navigation function
 */
export const withNavigationLoading = (navigate) => {
  return (to, options = {}) => {
    window.dispatchEvent(new CustomEvent('loading-start'));
    
    // Small delay to show loading cursor
    setTimeout(() => {
      navigate(to, options);
      window.dispatchEvent(new CustomEvent('loading-end'));
    }, 100);
  };
};

/**
 * Custom hook for managing loading states with cursor
 * @returns {Object} Loading state and handlers
 */
export const useCursorLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const startLoading = useCallback(() => {
    setIsLoading(true);
    window.dispatchEvent(new CustomEvent('loading-start'));
  }, []);
  
  const stopLoading = useCallback(() => {
    setIsLoading(false);
    window.dispatchEvent(new CustomEvent('loading-end'));
  }, []);
  
  const withLoading = useCallback(async (asyncFunction) => {
    startLoading();
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  };
}; 