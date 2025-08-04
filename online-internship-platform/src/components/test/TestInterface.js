import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../contexts/TestContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaClock, FaExclamationTriangle, FaCheck, FaTimes, FaArrowLeft, FaArrowRight, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const TestInterface = () => {
  const navigate = useNavigate();
  const { 
    questions, 
    currentQuestionIndex, 
    answers, 
    timeRemaining, 
    warnings, 
    submitAnswer, 
    nextQuestion, 
    prevQuestion, 
    goToQuestion, 
    updateTimer, 
    addWarning, 
    completeTest 
  } = useTest();
  const { user } = useAuth();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      completeTest();
      return;
    }

    const timer = setInterval(() => {
      updateTimer(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, updateTimer, completeTest]);

  // Anti-cheating monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addWarning();
        toast.error('Warning: Tab switching detected!');
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        addWarning();
        toast.error('Warning: Keyboard shortcuts disabled!');
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      addWarning();
      toast.error('Warning: Right-click disabled!');
    };

    // Activity monitoring
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('click', handleActivity);

    // Check for inactivity
    const inactivityTimer = setInterval(() => {
      if (Date.now() - lastActivity > 30000) { // 30 seconds
        addWarning();
        toast.error('Warning: Inactivity detected!');
        setLastActivity(Date.now());
      }
    }, 10000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('click', handleActivity);
      clearInterval(inactivityTimer);
    };
  }, [addWarning, lastActivity]);

  // Auto-save answers
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (selectedAnswer !== null) {
        submitAnswer(currentQuestion.id, selectedAnswer);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveTimer);
  }, [selectedAnswer, currentQuestion, submitAnswer]);

  // Set selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion?.id] || null);
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    submitAnswer(currentQuestion.id, answerIndex);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      prevQuestion();
    }
  };

  const handleSubmit = () => {
    setShowWarning(true);
  };

  const confirmSubmit = () => {
    setShowWarning(false);
    completeTest();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-primary-dark">Loading test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg test-container">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <YugaYatraLogo className="w-10 h-10" showText={false} />
              <h1 className="text-xl font-bold text-primary-dark ml-3">Internship Assessment Test</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Warnings */}
              {warnings > 0 && (
                <div className="flex items-center text-warning">
                  <FaExclamationTriangle className="mr-1" />
                  <span className="text-sm font-medium">Warnings: {warnings}/3</span>
                </div>
              )}
              
              {/* Timer */}
              <div className={`test-timer ${timeRemaining <= 300 ? 'pulse-glow' : ''}`}>
                <FaClock className="mr-2" />
                {formatTime(timeRemaining)}
              </div>
              
              {/* Progress */}
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="card">
              {/* Question Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <span className="bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentQuestion.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {currentQuestion.category}
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-primary-dark mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? 'border-primary-dark bg-primary-dark text-white'
                          : 'border-gray-200 hover:border-primary-dark hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-medium text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="btn-outline flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {getAnsweredCount()} of {questions.length} answered
                  </span>
                  <button
                    onClick={handleSubmit}
                    className="btn-secondary flex items-center"
                  >
                    <FaCheck className="mr-2" />
                    Submit Test
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="btn-outline flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-dark mb-4">Question Navigator</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                      index === currentQuestionIndex
                        ? 'bg-primary-dark text-white'
                        : answers[questions[index]?.id] !== undefined
                        ? 'bg-success text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary-dark rounded mr-2"></div>
                  <span>Current Question</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-success rounded mr-2"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
                  <span>Unanswered</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Auto-save enabled</p>
                  <div className="flex items-center justify-center text-success">
                    <FaSave className="mr-1" />
                    <span className="text-xs">Saving every 30s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-warning text-2xl mr-3" />
                <h3 className="text-xl font-bold text-primary-dark">Confirm Submission</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to submit your test? You cannot change your answers after submission.
              </p>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowWarning(false)}
                  className="btn-outline px-6 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="btn-secondary px-6 py-2"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterface; 