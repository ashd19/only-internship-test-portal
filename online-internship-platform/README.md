# Online Internship Platform

A comprehensive web-based platform for managing internships, tests, and student evaluations.

## 🚀 Features

- **Student Portal**: Take tests, view results, and manage profile
- **Admin Dashboard**: Create tests, manage students, and view analytics
- **Payment Integration**: Secure payment processing with Razorpay
- **Anti-Cheating System**: Advanced cursor tracking and monitoring
- **Real-time Testing**: Live test interface with timer
- **Email Notifications**: Automated email services for results and updates

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Razorpay
- **Email**: SMTP/Nodemailer
- **Authentication**: JWT

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   ├── payment/        # Payment related components
│   ├── student/        # Student dashboard components
│   └── test/           # Test interface components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── styles/             # CSS styles
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ruchithamula/online-internship-platform.git
   cd online-internship-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend
   npm install
   ```

3. **Environment Setup**
   - Create `.env` file in backend directory
   - Add your MongoDB connection string
   - Configure Razorpay credentials
   - Set up SMTP settings

4. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # Start frontend (in new terminal)
   npm start
   ```

## 🔧 Configuration

### Backend Configuration
- MongoDB connection
- JWT secret key
- Razorpay API keys
- SMTP settings for email

### Frontend Configuration
- API endpoints
- Payment gateway settings
- Anti-cheating parameters

## 📱 Usage

### For Students
1. Register/Login to student portal
2. Browse available tests
3. Complete payment for test access
4. Take the test with anti-cheating monitoring
5. View results and certificates

### For Admins
1. Login to admin dashboard
2. Create and manage tests
3. Monitor student activities
4. View analytics and reports
5. Manage user accounts

## 🔒 Security Features

- **Anti-Cheating**: Real-time cursor tracking
- **Session Management**: Secure authentication
- **Payment Security**: Encrypted payment processing
- **Data Protection**: Secure data transmission

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.



## 🙏 Acknowledgments

- React.js community
- Tailwind CSS team
- Razorpay for payment integration
- MongoDB for database solutions

---

⭐ Star this repository if you find it helpful! 
