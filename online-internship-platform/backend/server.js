const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/onlyinternship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Question = require('./models/Question');
const Test = require('./models/Test');
const Payment = require('./models/Payment');
const Result = require('./models/Result');

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Authentication routes
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save or update user with OTP
    await User.findOneAndUpdate(
      { email },
      { 
        email,
        otp,
        otpExpiry,
        lastOtpSent: new Date()
      },
      { upsert: true, new: true }
    );

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP for Login - OnlyInternship.in',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C3E50;">OTP Verification</h2>
          <p>Your OTP is: <strong style="font-size: 24px; color: #E74C3C;">${otp}</strong></p>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <hr>
          <p><small>OnlyInternship.in - Yuga Yatra Retail (OPC) Private Limited</small></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role || 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || 'student',
        profileComplete: user.profileComplete || false
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username, role: 'admin' });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// User profile routes
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, college } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.phone = phone;
    user.college = college;
    user.profileComplete = true;
    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        college: user.college,
        profileComplete: user.profileComplete
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Question routes
app.get('/api/questions', authenticateToken, async (req, res) => {
  try {
    const questions = await Question.find({ active: true });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.post('/api/questions', authenticateAdmin, async (req, res) => {
  try {
    const { text, options, correctAnswer, difficulty, category } = req.body;

    const question = new Question({
      text,
      options,
      correctAnswer,
      difficulty,
      category,
      createdBy: req.user.userId
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
});

app.put('/api/questions/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const question = await Question.findByIdAndUpdate(id, updates, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

app.delete('/api/questions/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

// Test routes
app.post('/api/tests/start', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Check if user has paid
    const payment = await Payment.findOne({ 
      userId, 
      status: 'completed',
      testEnabled: true 
    });

    if (!payment) {
      return res.status(402).json({ error: 'Payment required to start test' });
    }

    // Check attempt limit
    const existingTests = await Test.countDocuments({ userId });
    if (existingTests >= 3) {
      return res.status(400).json({ error: 'Maximum attempts reached' });
    }

    // Generate test questions
    const questions = await generateTestQuestions();
    
    const test = new Test({
      userId,
      questions: questions.map(q => q._id),
      startTime: new Date(),
      status: 'active'
    });

    await test.save();

    res.json({
      testId: test._id,
      questions: questions.map(q => ({
        id: q._id,
        text: q.text,
        options: q.options,
        difficulty: q.difficulty,
        category: q.category
      }))
    });
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({ error: 'Failed to start test' });
  }
});

app.post('/api/tests/:id/submit', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, timeTaken, warnings } = req.body;
    const userId = req.user.userId;

    const test = await Test.findById(id);
    if (!test || test.userId.toString() !== userId) {
      return res.status(404).json({ error: 'Test not found' });
    }

    // Calculate results
    const questions = await Question.find({ _id: { $in: test.questions } });
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (answers[question._id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= 60;

    // Save result
    const result = new Result({
      testId: test._id,
      userId,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      passed,
      timeTaken,
      warnings,
      answers,
      submittedAt: new Date()
    });

    await result.save();

    // Update test status
    test.status = 'completed';
    test.endTime = new Date();
    await test.save();

    // Send result email
    const user = await User.findById(userId);
    if (user && user.email) {
      await sendTestResultEmail(user.email, {
        userName: user.name,
        score,
        totalQuestions: questions.length,
        correctAnswers,
        passed,
        timeTaken,
        percentile: calculatePercentile(score)
      });
    }

    res.json({
      result: {
        score,
        correctAnswers,
        totalQuestions: questions.length,
        passed,
        timeTaken,
        warnings
      }
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ error: 'Failed to submit test' });
  }
});

// Payment routes
app.post('/api/payments/create-order', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const amount = 29500; // ₹295 in paise

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `test_${userId}_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        testType: 'internship_assessment'
      }
    });

    const payment = new Payment({
      userId,
      orderId: order.id,
      amount: amount / 100,
      status: 'pending'
    });

    await payment.save();

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

app.post('/api/payments/verify', authenticateToken, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment verified
      const payment = await Payment.findOne({ orderId: razorpay_order_id });
      if (payment) {
        payment.status = 'completed';
        payment.paymentId = razorpay_payment_id;
        payment.testEnabled = true;
        await payment.save();
      }

      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Admin routes
app.get('/api/admin/candidates', authenticateAdmin, async (req, res) => {
  try {
    const candidates = await User.aggregate([
      { $match: { role: { $ne: 'admin' } } },
      {
        $lookup: {
          from: 'results',
          localField: '_id',
          foreignField: 'userId',
          as: 'results'
        }
      },
      {
        $lookup: {
          from: 'tests',
          localField: '_id',
          foreignField: 'userId',
          as: 'tests'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          attempts: { $size: '$tests' },
          bestScore: { $max: '$results.score' },
          lastAttempt: { $max: '$tests.startTime' },
          status: {
            $cond: {
              if: { $gt: [{ $max: '$results.passed' }, false] },
              then: 'passed',
              else: 'failed'
            }
          }
        }
      }
    ]);

    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

app.get('/api/admin/merit-list', authenticateAdmin, async (req, res) => {
  try {
    const meritList = await Result.aggregate([
      { $match: { passed: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 1,
          userName: '$user.name',
          userEmail: '$user.email',
          score: 1,
          percentile: 1,
          submittedAt: 1
        }
      },
      { $sort: { score: -1 } },
      { $limit: 10 }
    ]);

    res.json(meritList);
  } catch (error) {
    console.error('Error fetching merit list:', error);
    res.status(500).json({ error: 'Failed to fetch merit list' });
  }
});

// Utility functions
async function generateTestQuestions() {
  const easyQuestions = await Question.find({ difficulty: 'easy', active: true });
  const moderateQuestions = await Question.find({ difficulty: 'moderate', active: true });
  const expertQuestions = await Question.find({ difficulty: 'expert', active: true });

  const selectedEasy = easyQuestions.sort(() => 0.5 - Math.random()).slice(0, 12);
  const selectedModerate = moderateQuestions.sort(() => 0.5 - Math.random()).slice(0, 12);
  const selectedExpert = expertQuestions.sort(() => 0.5 - Math.random()).slice(0, 11);

  return [...selectedEasy, ...selectedModerate, ...selectedExpert]
    .sort(() => 0.5 - Math.random());
}

async function sendTestResultEmail(email, testData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Test Results - ${testData.passed ? 'PASSED' : 'FAILED'} - OnlyInternship.in`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C3E50;">Test Results</h2>
          <p>Dear ${testData.userName},</p>
          <p>Your test result: <strong style="color: ${testData.passed ? '#27AE60' : '#E74C3C'};">
            ${testData.passed ? 'PASSED' : 'FAILED'}
          </strong></p>
          <p>Score: ${testData.score}% (${testData.correctAnswers}/${testData.totalQuestions})</p>
          <p>Percentile: ${testData.percentile}</p>
          <p>Time taken: ${testData.timeTaken}</p>
          ${testData.passed ? 
            '<p><a href="#" style="background: #27AE60; color: white; padding: 10px 20px; text-decoration: none;">Download Certificate</a></p>' :
            '<p>Better luck next time! You can retake the test.</p>'
          }
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending test result email:', error);
  }
}

function calculatePercentile(score) {
  // Mock percentile calculation
  return Math.round((score / 100) * 100);
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 