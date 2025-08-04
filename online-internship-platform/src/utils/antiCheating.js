// Anti-Cheating Security System
class AntiCheatingSystem {
  constructor() {
    this.warnings = 0;
    this.maxWarnings = 3;
    this.inactivityTimeout = 10000; // 10 seconds
    this.lastActivity = Date.now();
    this.inactivityTimer = null;
    this.isActive = false;
    this.onWarning = null;
    this.onAutoSubmit = null;
  }

  // Initialize anti-cheating measures
  init(onWarning, onAutoSubmit) {
    this.onWarning = onWarning;
    this.onAutoSubmit = onAutoSubmit;
    this.isActive = true;
    
    this.disableRightClick();
    this.disableKeyboardShortcuts();
    this.disableTextSelection();
    this.monitorTabSwitching();
    this.monitorInactivity();
    this.monitorActivity();
    this.disableDevTools();
    this.preventScreenshots();
    
    console.log('Anti-cheating system activated');
  }

  // Disable right-click context menu
  disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.addWarning('Right-click disabled');
      return false;
    });
  }

  // Disable keyboard shortcuts
  disableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Prevent common shortcuts
      const blockedKeys = [
        'F12', 'F5', 'F11', // Dev tools and refresh
        'PrintScreen', 'PrtScn', // Screenshot
        'Meta+Shift+3', 'Meta+Shift+4', // Mac screenshots
        'Ctrl+Shift+I', 'Ctrl+Shift+J', 'Ctrl+U', // Dev tools
        'Ctrl+P', 'Ctrl+S', 'Ctrl+U', // Print, Save, View Source
        'Alt+Tab', 'Alt+F4', // Window switching
        'Ctrl+Tab', 'Ctrl+Shift+Tab', // Tab switching
        'Ctrl+W', 'Ctrl+N', // Close/New window
        'Ctrl+R', 'F5', // Refresh
        'Ctrl+Shift+R', 'Ctrl+F5' // Hard refresh
      ];

      const keyCombo = this.getKeyCombo(e);
      
      if (blockedKeys.includes(keyCombo) || 
          (e.ctrlKey && e.shiftKey) || 
          (e.metaKey && e.shiftKey)) {
        e.preventDefault();
        this.addWarning('Keyboard shortcuts disabled');
        return false;
      }
    });
  }

  // Get key combination string
  getKeyCombo(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.metaKey) parts.push('Meta');
    if (e.shiftKey) parts.push('Shift');
    if (e.altKey) parts.push('Alt');
    if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Alt') {
      parts.push(e.key);
    }
    return parts.join('+');
  }

  // Disable text selection
  disableTextSelection() {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  }

  // Monitor tab/window switching
  monitorTabSwitching() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.addWarning('Tab switching detected');
      }
    });

    window.addEventListener('blur', () => {
      this.addWarning('Window focus lost');
    });

    window.addEventListener('focus', () => {
      this.lastActivity = Date.now();
    });
  }

  // Monitor inactivity
  monitorInactivity() {
    this.inactivityTimer = setInterval(() => {
      if (Date.now() - this.lastActivity > this.inactivityTimeout) {
        this.addWarning('Inactivity detected');
        this.lastActivity = Date.now();
      }
    }, 5000); // Check every 5 seconds
  }

  // Monitor user activity
  monitorActivity() {
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, () => {
        this.lastActivity = Date.now();
      }, { passive: true });
    });
  }

  // Disable developer tools
  disableDevTools() {
    // Method 1: Detect F12
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12') {
        e.preventDefault();
        this.addWarning('Developer tools access blocked');
        return false;
      }
    });

    // Method 2: Detect dev tools via console
    setInterval(() => {
      const devtools = {
        open: false,
        orientation: null
      };

      const threshold = 160;

      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.addWarning('Developer tools detected');
        }
      } else {
        devtools.open = false;
      }
    }, 1000);
  }

  // Prevent screenshots
  preventScreenshots() {
    // Disable print screen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'PrintScreen' || e.key === 'PrtScn') {
        e.preventDefault();
        this.addWarning('Screenshot attempt blocked');
        return false;
      }
    });

    // Disable screen capture API
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
      navigator.mediaDevices.getDisplayMedia = function() {
        this.addWarning('Screen capture attempt blocked');
        return Promise.reject(new Error('Screen capture not allowed'));
      };
    }
  }

  // Add warning and handle consequences
  addWarning(reason) {
    if (!this.isActive) return;

    this.warnings++;
    
    if (this.onWarning) {
      this.onWarning(this.warnings, reason);
    }

    console.warn(`Warning ${this.warnings}/${this.maxWarnings}: ${reason}`);

    if (this.warnings >= this.maxWarnings) {
      this.triggerAutoSubmit();
    }
  }

  // Trigger auto-submit
  triggerAutoSubmit() {
    if (this.onAutoSubmit) {
      this.onAutoSubmit('Maximum warnings reached');
    }
  }

  // Get current warning count
  getWarnings() {
    return this.warnings;
  }

  // Reset warnings
  resetWarnings() {
    this.warnings = 0;
  }

  // Deactivate anti-cheating
  deactivate() {
    this.isActive = false;
    
    if (this.inactivityTimer) {
      clearInterval(this.inactivityTimer);
    }

    // Remove event listeners (basic cleanup)
    document.removeEventListener('contextmenu', this.disableRightClick);
    document.removeEventListener('keydown', this.disableKeyboardShortcuts);
    document.removeEventListener('visibilitychange', this.monitorTabSwitching);
    
    console.log('Anti-cheating system deactivated');
  }
}

export default AntiCheatingSystem; 