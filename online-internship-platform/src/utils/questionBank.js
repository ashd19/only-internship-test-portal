// Question Bank Management System
class QuestionBank {
  constructor() {
    this.questions = [];
    this.difficultyDistribution = {
      easy: 0.50,    // 50% Easy questions
      moderate: 0.30, // 30% Moderate questions
      expert: 0.20    // 20% Expert questions
    };
    this.totalQuestions = 35;
  }

  // Load questions from database/API
  async loadQuestions() {
    try {
      // In production, this would fetch from Firebase/Firestore
      // For now, using sample questions
      this.questions = this.getSampleQuestions();
      return this.questions;
    } catch (error) {
      console.error('Error loading questions:', error);
      throw error;
    }
  }

  // Generate test with random questions based on difficulty distribution
  generateTest() {
    if (this.questions.length === 0) {
      throw new Error('No questions available');
    }

    const testQuestions = [];
    
    // Calculate questions per difficulty
    const easyCount = Math.round(this.totalQuestions * this.difficultyDistribution.easy);
    const moderateCount = Math.round(this.totalQuestions * this.difficultyDistribution.moderate);
    const expertCount = this.totalQuestions - easyCount - moderateCount; // Remaining for expert

    // Filter questions by difficulty
    const easyQuestions = this.questions.filter(q => q.difficulty === 'easy');
    const moderateQuestions = this.questions.filter(q => q.difficulty === 'moderate');
    const expertQuestions = this.questions.filter(q => q.difficulty === 'expert');

    // Select random questions for each difficulty
    const selectedEasy = this.getRandomQuestions(easyQuestions, easyCount);
    const selectedModerate = this.getRandomQuestions(moderateQuestions, moderateCount);
    const selectedExpert = this.getRandomQuestions(expertQuestions, expertCount);

    // Combine and shuffle
    testQuestions.push(...selectedEasy, ...selectedModerate, ...selectedExpert);
    
    return this.shuffleArray(testQuestions);
  }

  // Get random questions from a pool
  getRandomQuestions(questionPool, count) {
    if (questionPool.length <= count) {
      return [...questionPool];
    }

    const shuffled = this.shuffleArray([...questionPool]);
    return shuffled.slice(0, count);
  }

  // Fisher-Yates shuffle algorithm
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Add new question to bank
  async addQuestion(question) {
    try {
      // Validate question
      this.validateQuestion(question);

      // In production, save to Firebase/Firestore
      const newQuestion = {
        id: Date.now().toString(),
        ...question,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.questions.push(newQuestion);
      return newQuestion;
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }

  // Update existing question
  async updateQuestion(questionId, updates) {
    try {
      const index = this.questions.findIndex(q => q.id === questionId);
      if (index === -1) {
        throw new Error('Question not found');
      }

      // Validate updates
      if (updates.options) {
        this.validateOptions(updates.options);
      }

      // Update question
      this.questions[index] = {
        ...this.questions[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      return this.questions[index];
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  // Delete question
  async deleteQuestion(questionId) {
    try {
      const index = this.questions.findIndex(q => q.id === questionId);
      if (index === -1) {
        throw new Error('Question not found');
      }

      this.questions.splice(index, 1);
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }

  // Validate question structure
  validateQuestion(question) {
    if (!question.text || question.text.trim().length === 0) {
      throw new Error('Question text is required');
    }

    if (!question.options || !Array.isArray(question.options) || question.options.length < 2) {
      throw new Error('Question must have at least 2 options');
    }

    if (typeof question.correctAnswer !== 'number' || 
        question.correctAnswer < 0 || 
        question.correctAnswer >= question.options.length) {
      throw new Error('Invalid correct answer index');
    }

    if (!['easy', 'moderate', 'expert'].includes(question.difficulty)) {
      throw new Error('Difficulty must be easy, moderate, or expert');
    }

    if (!question.category || question.category.trim().length === 0) {
      throw new Error('Question category is required');
    }

    this.validateOptions(question.options);
  }

  // Validate options
  validateOptions(options) {
    const uniqueOptions = new Set(options.map(opt => opt.trim().toLowerCase()));
    if (uniqueOptions.size !== options.length) {
      throw new Error('All options must be unique');
    }

    options.forEach((option, index) => {
      if (!option || option.trim().length === 0) {
        throw new Error(`Option ${index + 1} cannot be empty`);
      }
    });
  }

  // Get questions by difficulty
  getQuestionsByDifficulty(difficulty) {
    return this.questions.filter(q => q.difficulty === difficulty);
  }

  // Get questions by category
  getQuestionsByCategory(category) {
    return this.questions.filter(q => q.category === category);
  }

  // Get statistics
  getStatistics() {
    const stats = {
      total: this.questions.length,
      easy: this.questions.filter(q => q.difficulty === 'easy').length,
      moderate: this.questions.filter(q => q.difficulty === 'moderate').length,
      expert: this.questions.filter(q => q.difficulty === 'expert').length,
      categories: {}
    };

    // Count by category
    this.questions.forEach(q => {
      stats.categories[q.category] = (stats.categories[q.category] || 0) + 1;
    });

    return stats;
  }

  // Sample questions for demo
  getSampleQuestions() {
    return [
      // Easy Questions (50%)
      {
        id: '1',
        text: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "General Knowledge"
      },
      {
        id: '2',
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Science"
      },
      {
        id: '3',
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Mathematics"
      },
      {
        id: '4',
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Literature"
      },
      {
        id: '5',
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3,
        difficulty: "easy",
        category: "Geography"
      },
      {
        id: '6',
        text: "Which year did India gain independence?",
        options: ["1945", "1946", "1947", "1948"],
        correctAnswer: 2,
        difficulty: "easy",
        category: "History"
      },
      {
        id: '7',
        text: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Science"
      },
      {
        id: '8',
        text: "How many sides does a triangle have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Mathematics"
      },
      {
        id: '9',
        text: "Which is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Biology"
      },
      {
        id: '10',
        text: "What is the main component of the sun?",
        options: ["Liquid Lava", "Molten Iron", "Hot Gases", "Solid Rock"],
        correctAnswer: 2,
        difficulty: "easy",
        category: "Science"
      },
      {
        id: '11',
        text: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "India"],
        correctAnswer: 2,
        difficulty: "easy",
        category: "Geography"
      },
      {
        id: '12',
        text: "What is the square root of 16?",
        options: ["2", "4", "8", "16"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Mathematics"
      },
      {
        id: '13',
        text: "Which element has the chemical symbol 'O'?",
        options: ["Osmium", "Oxygen", "Oganesson", "Osmium"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Chemistry"
      },
      {
        id: '14',
        text: "What is the largest desert in the world?",
        options: ["Gobi", "Sahara", "Arabian", "Antarctic"],
        correctAnswer: 3,
        difficulty: "easy",
        category: "Geography"
      },
      {
        id: '15',
        text: "Which is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: 2,
        difficulty: "easy",
        category: "Mathematics"
      },
      {
        id: '16',
        text: "What is the speed of light?",
        options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
        correctAnswer: 0,
        difficulty: "easy",
        category: "Physics"
      },
      {
        id: '17',
        text: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctAnswer: 1,
        difficulty: "easy",
        category: "Astronomy"
      },

      // Moderate Questions (30%)
      {
        id: '18',
        text: "What is the process by which plants make their own food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
        correctAnswer: 1,
        difficulty: "moderate",
        category: "Biology"
      },
      {
        id: '19',
        text: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 2,
        difficulty: "moderate",
        category: "Computer Science"
      },
      {
        id: '20',
        text: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        correctAnswer: 3,
        difficulty: "moderate",
        category: "Biology"
      },
      {
        id: '21',
        text: "Which of these is a primary color?",
        options: ["Green", "Purple", "Red", "Orange"],
        correctAnswer: 2,
        difficulty: "moderate",
        category: "Art"
      },
      {
        id: '22',
        text: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "O2", "N2"],
        correctAnswer: 0,
        difficulty: "moderate",
        category: "Chemistry"
      },
      {
        id: '23',
        text: "Which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        difficulty: "moderate",
        category: "History"
      },
      {
        id: '24',
        text: "What is the capital of Japan?",
        options: ["Kyoto", "Osaka", "Tokyo", "Yokohama"],
        correctAnswer: 2,
        difficulty: "moderate",
        category: "Geography"
      },
      {
        id: '25',
        text: "Which is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: 2,
        difficulty: "moderate",
        category: "Mathematics"
      },
      {
        id: '26',
        text: "What is the molecular structure of DNA?",
        options: ["Single helix", "Double helix", "Triple helix", "Quadruple helix"],
        correctAnswer: 1,
        difficulty: "moderate",
        category: "Biology"
      },
      {
        id: '27',
        text: "What is the process of converting analog signals to digital called?",
        options: ["Modulation", "Demodulation", "Quantization", "Sampling"],
        correctAnswer: 2,
        difficulty: "moderate",
        category: "Electronics"
      },
      {
        id: '28',
        text: "Which programming paradigm emphasizes immutability and pure functions?",
        options: ["Object-Oriented", "Functional", "Procedural", "Imperative"],
        correctAnswer: 1,
        difficulty: "moderate",
        category: "Computer Science"
      },

      // Expert Questions (20%)
      {
        id: '29',
        text: "What is the Heisenberg Uncertainty Principle?",
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
        id: '30',
        text: "Which algorithm is used for sorting with O(n log n) average time complexity?",
        options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
        correctAnswer: 1,
        difficulty: "expert",
        category: "Computer Science"
      },
      {
        id: '31',
        text: "Which theorem states that no three positive integers a, b, and c satisfy the equation a^n + b^n = c^n for any integer value of n greater than 2?",
        options: ["Pythagorean Theorem", "Fermat's Last Theorem", "Euler's Theorem", "Wilson's Theorem"],
        correctAnswer: 1,
        difficulty: "expert",
        category: "Mathematics"
      },
      {
        id: '32',
        text: "What is the name of the enzyme that breaks down lactose?",
        options: ["Amylase", "Lactase", "Protease", "Lipase"],
        correctAnswer: 1,
        difficulty: "expert",
        category: "Biology"
      },
      {
        id: '33',
        text: "Which of these is NOT a valid HTTP status code?",
        options: ["200", "404", "500", "999"],
        correctAnswer: 3,
        difficulty: "expert",
        category: "Computer Science"
      },
      {
        id: '34',
        text: "What is the chemical name for table salt?",
        options: ["Sodium chloride", "Potassium chloride", "Calcium chloride", "Magnesium chloride"],
        correctAnswer: 0,
        difficulty: "expert",
        category: "Chemistry"
      },
      {
        id: '35',
        text: "Which planet has the highest surface temperature?",
        options: ["Mercury", "Venus", "Earth", "Mars"],
        correctAnswer: 1,
        difficulty: "expert",
        category: "Astronomy"
      },
      {
        id: '36',
        text: "What is the largest known prime number as of 2024?",
        options: ["2^82,589,933 - 1", "2^77,232,917 - 1", "2^74,207,281 - 1", "2^57,885,161 - 1"],
        correctAnswer: 0,
        difficulty: "expert",
        category: "Mathematics"
      }
    ];
  }
}

export default QuestionBank; 