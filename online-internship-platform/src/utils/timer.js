// Timer and Auto-Save Management System
class TestTimer {
  constructor(duration = 1800) { // 30 minutes = 1800 seconds
    this.duration = duration;
    this.timeRemaining = duration;
    this.isRunning = false;
    this.timer = null;
    this.autoSaveTimer = null;
    this.autoSaveInterval = 30000; // 30 seconds
    this.onTick = null;
    this.onTimeout = null;
    this.onAutoSave = null;
    this.testId = null;
    this.answers = {};
  }

  // Initialize timer with callbacks
  init(testId, onTick, onTimeout, onAutoSave) {
    this.testId = testId;
    this.onTick = onTick;
    this.onTimeout = onTimeout;
    this.onAutoSave = onAutoSave;
    
    // Load saved answers from localStorage
    this.loadAnswers();
    
    console.log(`Timer initialized for test ${testId}`);
  }

  // Start the timer
  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.timer = setInterval(() => {
      this.timeRemaining--;
      
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }

      if (this.timeRemaining <= 0) {
        this.stop();
        if (this.onTimeout) {
          this.onTimeout('Time expired');
        }
      }
    }, 1000);

    // Start auto-save
    this.startAutoSave();
    
    console.log('Timer started');
  }

  // Stop the timer
  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
    
    console.log('Timer stopped');
  }

  // Pause the timer
  pause() {
    if (!this.isRunning) return;
    
    this.stop();
    console.log('Timer paused');
  }

  // Resume the timer
  resume() {
    if (this.isRunning || this.timeRemaining <= 0) return;
    
    this.start();
    console.log('Timer resumed');
  }

  // Start auto-save functionality
  startAutoSave() {
    this.autoSaveTimer = setInterval(() => {
      this.autoSave();
    }, this.autoSaveInterval);
  }

  // Auto-save answers
  autoSave() {
    if (this.onAutoSave) {
      this.onAutoSave(this.answers);
    }
    
    // Save to localStorage
    this.saveAnswers();
    
    console.log('Auto-save completed');
  }

  // Save answers to localStorage
  saveAnswers() {
    try {
      const saveData = {
        testId: this.testId,
        answers: this.answers,
        timeRemaining: this.timeRemaining,
        timestamp: Date.now()
      };
      
      localStorage.setItem(`test_answers_${this.testId}`, JSON.stringify(saveData));
    } catch (error) {
      console.error('Error saving answers to localStorage:', error);
    }
  }

  // Load answers from localStorage
  loadAnswers() {
    try {
      const savedData = localStorage.getItem(`test_answers_${this.testId}`);
      if (savedData) {
        const data = JSON.parse(savedData);
        this.answers = data.answers || {};
        this.timeRemaining = data.timeRemaining || this.duration;
        
        console.log('Answers loaded from localStorage');
        return true;
      }
    } catch (error) {
      console.error('Error loading answers from localStorage:', error);
    }
    return false;
  }

  // Clear saved answers
  clearSavedAnswers() {
    try {
      localStorage.removeItem(`test_answers_${this.testId}`);
      this.answers = {};
      console.log('Saved answers cleared');
    } catch (error) {
      console.error('Error clearing saved answers:', error);
    }
  }

  // Update answer for a question
  updateAnswer(questionId, answer) {
    this.answers[questionId] = answer;
    
    // Save immediately for critical answers
    this.saveAnswers();
  }

  // Get answer for a question
  getAnswer(questionId) {
    return this.answers[questionId];
  }

  // Get all answers
  getAllAnswers() {
    return { ...this.answers };
  }

  // Get time remaining in various formats
  getTimeRemaining() {
    return this.timeRemaining;
  }

  getTimeRemainingFormatted() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getTimeRemainingMinutes() {
    return Math.floor(this.timeRemaining / 60);
  }

  getTimeRemainingSeconds() {
    return this.timeRemaining % 60;
  }

  // Get time spent
  getTimeSpent() {
    return this.duration - this.timeRemaining;
  }

  getTimeSpentFormatted() {
    const minutes = Math.floor(this.getTimeSpent() / 60);
    const seconds = this.getTimeSpent() % 60;
    return `${minutes}m ${seconds}s`;
  }

  // Check if time is running low (last 5 minutes)
  isTimeRunningLow() {
    return this.timeRemaining <= 300; // 5 minutes
  }

  // Check if time is critical (last 1 minute)
  isTimeCritical() {
    return this.timeRemaining <= 60; // 1 minute
  }

  // Add time (for admin adjustments)
  addTime(seconds) {
    this.timeRemaining += seconds;
    console.log(`Added ${seconds} seconds to timer`);
  }

  // Subtract time (for penalties)
  subtractTime(seconds) {
    this.timeRemaining = Math.max(0, this.timeRemaining - seconds);
    console.log(`Subtracted ${seconds} seconds from timer`);
  }

  // Reset timer to original duration
  reset() {
    this.timeRemaining = this.duration;
    this.answers = {};
    this.clearSavedAnswers();
    console.log('Timer reset');
  }

  // Get timer status
  getStatus() {
    return {
      isRunning: this.isRunning,
      timeRemaining: this.timeRemaining,
      timeSpent: this.getTimeSpent(),
      timeRemainingFormatted: this.getTimeRemainingFormatted(),
      timeSpentFormatted: this.getTimeSpentFormatted(),
      isTimeRunningLow: this.isTimeRunningLow(),
      isTimeCritical: this.isTimeCritical(),
      answersCount: Object.keys(this.answers).length
    };
  }

  // Handle page visibility change (pause/resume)
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, could pause timer or add warning
      console.log('Page hidden - monitoring for suspicious activity');
    } else {
      // Page is visible again
      console.log('Page visible again');
    }
  }

  // Handle beforeunload event
  handleBeforeUnload(event) {
    if (this.isRunning) {
      // Save answers before leaving
      this.autoSave();
      
      // Show warning message
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave? Your test will be submitted automatically.';
      return event.returnValue;
    }
  }

  // Initialize page event listeners
  initPageListeners() {
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });

    window.addEventListener('beforeunload', (event) => {
      this.handleBeforeUnload(event);
    });

    // Handle page reload
    window.addEventListener('load', () => {
      if (this.testId) {
        this.loadAnswers();
      }
    });
  }

  // Cleanup
  destroy() {
    this.stop();
    this.clearSavedAnswers();
    
    // Remove event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    
    console.log('Timer destroyed');
  }
}

export default TestTimer; 