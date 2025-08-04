import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const TestContext = createContext();

const initialState = {
  currentTest: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 1800, // 30 minutes in seconds
  testStarted: false,
  testCompleted: false,
  results: null,
  warnings: 0,
  suspiciousActivity: false,
  autoSaveEnabled: true,
  loading: false,
};

const testReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'START_TEST':
      return {
        ...state,
        currentTest: action.payload.test,
        questions: action.payload.questions,
        testStarted: true,
        timeRemaining: 1800,
        currentQuestionIndex: 0,
        answers: {},
        warnings: 0,
        suspiciousActivity: false,
      };
    
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    
    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: action.payload,
      };
    
    case 'ADD_WARNING':
      return {
        ...state,
        warnings: state.warnings + 1,
        suspiciousActivity: state.warnings + 1 >= 3,
      };
    
    case 'COMPLETE_TEST':
      return {
        ...state,
        testCompleted: true,
        results: action.payload,
      };
    
    case 'RESET_TEST':
      return {
        ...initialState,
        loading: false,
      };
    
    case 'AUTO_SAVE':
      return {
        ...state,
        answers: {
          ...state.answers,
          ...action.payload,
        },
      };
    
    default:
      return state;
  }
};

// Sample questions database
const sampleQuestions = [
  // Easy Questions (33%)
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "General Knowledge"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Science"
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Mathematics"
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Literature"
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
    difficulty: "easy",
    category: "Geography"
  },
  {
    id: 6,
    question: "Which year did India gain independence?",
    options: ["1945", "1946", "1947", "1948"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "History"
  },
  {
    id: 7,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Science"
  },
  {
    id: 8,
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Mathematics"
  },
  {
    id: 9,
    question: "Which is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Biology"
  },
  {
    id: 10,
    question: "What is the main component of the sun?",
    options: ["Liquid Lava", "Molten Iron", "Hot Gases", "Solid Rock"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "Science"
  },
  {
    id: 11,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "India"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "Geography"
  },
  {
    id: 12,
    question: "What is the square root of 16?",
    options: ["2", "4", "8", "16"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Mathematics"
  },
  
  // Moderate Questions (34%)
  {
    id: 13,
    question: "What is the process by which plants make their own food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    correctAnswer: 1,
    difficulty: "moderate",
    category: "Biology"
  },
  {
    id: 14,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2,
    difficulty: "moderate",
    category: "Computer Science"
  },
  {
    id: 15,
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Brain", "Liver", "Skin"],
    correctAnswer: 3,
    difficulty: "moderate",
    category: "Biology"
  },
  {
    id: 16,
    question: "Which of these is a primary color?",
    options: ["Green", "Purple", "Red", "Orange"],
    correctAnswer: 2,
    difficulty: "moderate",
    category: "Art"
  },
  {
    id: 17,
    question: "What is the speed of light?",
    options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
    correctAnswer: 0,
    difficulty: "moderate",
    category: "Physics"
  },
  {
    id: 18,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: 1,
    difficulty: "moderate",
    category: "Astronomy"
  },
  {
    id: 19,
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "O2", "N2"],
    correctAnswer: 0,
    difficulty: "moderate",
    category: "Chemistry"
  },
  {
    id: 20,
    question: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    difficulty: "moderate",
    category: "History"
  },
  {
    id: 21,
    question: "What is the capital of Japan?",
    options: ["Kyoto", "Osaka", "Tokyo", "Yokohama"],
    correctAnswer: 2,
    difficulty: "moderate",
    category: "Geography"
  },
  {
    id: 22,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oganesson", "Osmium"],
    correctAnswer: 1,
    difficulty: "moderate",
    category: "Chemistry"
  },
  {
    id: 23,
    question: "What is the largest desert in the world?",
    options: ["Gobi", "Sahara", "Arabian", "Antarctic"],
    correctAnswer: 3,
    difficulty: "moderate",
    category: "Geography"
  },
  {
    id: 24,
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    difficulty: "moderate",
    category: "Mathematics"
  },
  
  // Expert Questions (33%)
  {
    id: 25,
    question: "What is the Heisenberg Uncertainty Principle?",
    options: [
      "You cannot simultaneously know the position and momentum of a particle",
      "Energy cannot be created or destroyed",
      "Every action has an equal and opposite reaction",
      "Light travels in straight lines"
    ],
    correctAnswer: 0,
    difficulty: "expert",
    category: "Physics"
  },
  {
    id: 26,
    question: "Which algorithm is used for sorting with O(n log n) average time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: 1,
    difficulty: "expert",
    category: "Computer Science"
  },
  {
    id: 27,
    question: "What is the molecular structure of DNA?",
    options: ["Single helix", "Double helix", "Triple helix", "Quadruple helix"],
    correctAnswer: 1,
    difficulty: "expert",
    category: "Biology"
  },
  {
    id: 28,
    question: "Which theorem states that no three positive integers a, b, and c satisfy the equation a^n + b^n = c^n for any integer value of n greater than 2?",
    options: ["Pythagorean Theorem", "Fermat's Last Theorem", "Euler's Theorem", "Wilson's Theorem"],
    correctAnswer: 1,
    difficulty: "expert",
    category: "Mathematics"
  },
  {
    id: 29,
    question: "What is the process of converting analog signals to digital called?",
    options: ["Modulation", "Demodulation", "Quantization", "Sampling"],
    correctAnswer: 2,
    difficulty: "expert",
    category: "Electronics"
  },
  {
    id: 30,
    question: "Which programming paradigm emphasizes immutability and pure functions?",
    options: ["Object-Oriented", "Functional", "Procedural", "Imperative"],
    correctAnswer: 1,
    difficulty: "expert",
    category: "Computer Science"
  },
  {
    id: 31,
    question: "What is the name of the enzyme that breaks down lactose?",
    options: ["Amylase", "Lactase", "Protease", "Lipase"],
    correctAnswer: 1,
    difficulty: "expert",
    category: "Biology"
  },
  {
    id: 32,
    question: "Which of these is NOT a valid HTTP status code?",
    options: ["200", "404", "500", "999"],
    correctAnswer: 3,
    difficulty: "expert",
    category: "Computer Science"
  },
  {
    id: 33,
    question: "What is the chemical name for table salt?",
    options: ["Sodium chloride", "Potassium chloride", "Calcium chloride", "Magnesium chloride"],
    correctAnswer: 0,
    difficulty: "expert",
    category: "Chemistry"
  },
  {
    id: 34,
    question: "Which planet has the highest surface temperature?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: 1,
    difficulty: "expert",
    category: "Astronomy"
  },
  {
    id: 35,
    question: "What is the largest known prime number as of 2024?",
    options: ["2^82,589,933 - 1", "2^77,232,917 - 1", "2^74,207,281 - 1", "2^57,885,161 - 1"],
    correctAnswer: 0,
    difficulty: "expert",
    category: "Mathematics"
  }
];

export const TestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  // Generate random test questions
  const generateTest = () => {
    const easyQuestions = sampleQuestions.filter(q => q.difficulty === 'easy');
    const moderateQuestions = sampleQuestions.filter(q => q.difficulty === 'moderate');
    const expertQuestions = sampleQuestions.filter(q => q.difficulty === 'expert');

    // Select random questions based on difficulty distribution
    const selectedEasy = easyQuestions.sort(() => 0.5 - Math.random()).slice(0, 12);
    const selectedModerate = moderateQuestions.sort(() => 0.5 - Math.random()).slice(0, 12);
    const selectedExpert = expertQuestions.sort(() => 0.5 - Math.random()).slice(0, 11);

    const allQuestions = [...selectedEasy, ...selectedModerate, ...selectedExpert];
    
    // Shuffle the final array
    return allQuestions.sort(() => 0.5 - Math.random());
  };

  // Start test
  const startTest = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const questions = generateTest();
      const test = {
        id: 'test_' + Date.now(),
        title: 'Internship Assessment Test',
        duration: 1800, // 30 minutes
        totalQuestions: 35,
        startTime: new Date().toISOString(),
      };
      
      dispatch({
        type: 'START_TEST',
        payload: { test, questions },
      });
      
      toast.success('Test started! Good luck!');
      
    } catch (error) {
      toast.error('Failed to start test. Please try again.');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Submit answer
  const submitAnswer = (questionId, answer) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId, answer },
    });
  };

  // Navigate questions
  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const prevQuestion = () => {
    dispatch({ type: 'PREV_QUESTION' });
  };

  const goToQuestion = (index) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: index });
  };

  // Timer management
  const updateTimer = (timeRemaining) => {
    dispatch({ type: 'UPDATE_TIMER', payload: timeRemaining });
    
    if (timeRemaining <= 0) {
      completeTest();
    }
  };

  // Add warning for suspicious activity
  const addWarning = () => {
    dispatch({ type: 'ADD_WARNING' });
    
    const newWarningCount = state.warnings + 1;
    if (newWarningCount >= 3) {
      toast.error('Maximum warnings reached. Test will be submitted automatically.');
      completeTest();
    } else {
      toast.error(`Warning ${newWarningCount}/3: Suspicious activity detected!`);
    }
  };

  // Complete test and calculate results
  const completeTest = () => {
    const totalQuestions = state.questions.length;
    let correctAnswers = 0;
    
    state.questions.forEach((question, index) => {
      const userAnswer = state.answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= 60; // 60% passing criteria
    
    const results = {
      score,
      correctAnswers,
      totalQuestions,
      passed,
      timeTaken: 1800 - state.timeRemaining,
      completedAt: new Date().toISOString(),
      warnings: state.warnings,
    };
    
    dispatch({ type: 'COMPLETE_TEST', payload: results });
    
    if (passed) {
      toast.success(`Congratulations! You passed with ${score}%`);
    } else {
      toast.error(`Test completed. You scored ${score}%. Minimum required: 60%`);
    }
  };

  // Auto-save answers
  const autoSave = (answers) => {
    dispatch({ type: 'AUTO_SAVE', payload: answers });
  };

  // Reset test
  const resetTest = () => {
    dispatch({ type: 'RESET_TEST' });
  };

  const value = {
    ...state,
    startTest,
    submitAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    updateTimer,
    addWarning,
    completeTest,
    autoSave,
    resetTest,
  };

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}; 