import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../contexts/TestContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaTrophy, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaArrowLeft, 
  FaDownload,
  FaStar,
  FaChartBar,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import Confetti from 'react-confetti';

const TestResults = () => {
  const navigate = useNavigate();
  const { results, questions, answers, resetTest } = useTest();
  const { user } = useAuth();
  
  const [showAnswers, setShowAnswers] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!results) {
      navigate('/student/dashboard');
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  const {
    score,
    correctAnswers,
    totalQuestions,
    passed,
    timeTaken,
    warnings,
  } = results;

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const timeSpent = Math.floor(timeTaken / 60);
  const timeRemaining = Math.floor((1800 - timeTaken) / 60);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 80) return 'Great job! Well done!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Passed! You made it!';
    return 'Keep practicing and try again!';
  };

  const getDifficultyStats = () => {
    const stats = { easy: 0, moderate: 0, expert: 0 };
    const correct = { easy: 0, moderate: 0, expert: 0 };

    questions.forEach((question, index) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      stats[question.difficulty]++;
      if (isCorrect) {
        correct[question.difficulty]++;
      }
    });

    return { stats, correct };
  };

  const { stats, correct } = getDifficultyStats();

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Confetti for passing */}
      {passed && <Confetti width={windowDimensions.width} height={windowDimensions.height} />}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="flex items-center text-primary-dark hover:text-accent-red transition-colors mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-primary-dark">Test Results</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Completed on {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="card mb-8">
          <div className="text-center mb-8">
            {passed ? (
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaTrophy className="text-4xl text-green-600" />
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <FaTimesCircle className="text-4xl text-red-600" />
                </div>
              </div>
            )}

            <h2 className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
              {percentage}%
            </h2>
            <p className="text-xl text-gray-600 mb-4">{getScoreMessage()}</p>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {passed ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
              {passed ? 'PASSED' : 'FAILED'}
            </div>
          </div>

          {/* Score Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FaChartBar className="text-3xl text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800">Score</h3>
              <p className="text-2xl font-bold text-blue-600">
                {correctAnswers}/{totalQuestions}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <FaClock className="text-3xl text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800">Time Used</h3>
              <p className="text-2xl font-bold text-green-600">
                {timeSpent}m {timeRemaining}m left
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <FaExclamationTriangle className="text-3xl text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-yellow-800">Warnings</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {warnings}/3
              </p>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-primary-dark mb-4">Performance by Difficulty</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(stats).map(([difficulty, total]) => (
                <div key={difficulty} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium capitalize">{difficulty}</span>
                    <span className="text-sm text-gray-600">
                      {correct[difficulty]}/{total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-dark h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(correct[difficulty] / total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {Math.round((correct[difficulty] / total) * 100)}% accuracy
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="btn-outline flex items-center justify-center"
            >
              <FaStar className="mr-2" />
              {showAnswers ? 'Hide' : 'View'} Detailed Answers
            </button>
            
            {passed && (
              <button
                onClick={() => {/* Handle certificate download */}}
                className="btn-primary flex items-center justify-center"
              >
                <FaDownload className="mr-2" />
                Download Certificate
              </button>
            )}
            
            <button
              onClick={() => {
                resetTest();
                navigate('/student/dashboard');
              }}
              className="btn-secondary flex items-center justify-center"
            >
              Take Another Test
            </button>
          </div>
        </div>

        {/* Detailed Answers */}
        {showAnswers && (
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-dark mb-6">Detailed Answers</h3>
            
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium">
                          Q{index + 1}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {isCorrect ? (
                          <FaCheckCircle className="text-success text-xl" />
                        ) : (
                          <FaTimesCircle className="text-danger text-xl" />
                        )}
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-primary-dark mb-4">
                      {question.question}
                    </h4>

                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border-2 ${
                            optionIndex === question.correctAnswer
                              ? 'border-success bg-green-50'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'border-danger bg-red-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-medium">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {optionIndex === question.correctAnswer && (
                              <FaCheckCircle className="text-success ml-2" />
                            )}
                            {optionIndex === userAnswer && !isCorrect && optionIndex !== question.correctAnswer && (
                              <FaTimesCircle className="text-danger ml-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!isCorrect && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Your Answer:</strong> {String.fromCharCode(65 + userAnswer)} - {question.options[userAnswer]}
                        </p>
                        <p className="text-sm text-red-800">
                          <strong>Correct Answer:</strong> {String.fromCharCode(65 + question.correctAnswer)} - {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResults; 