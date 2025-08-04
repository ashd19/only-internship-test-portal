# OnlyInternship.in - Deployment Guide

## 🚀 Complete Deployment Instructions

This guide covers the complete deployment of the OnlyInternship.in platform to production, including frontend, backend, database, and payment integration.

## 📋 Prerequisites

### Required Accounts & Services
- [ ] **Hostinger Shared Hosting** (or VPS)
- [ ] **MongoDB Atlas** (Cloud Database)
- [ ] **Razorpay Business Account**
- [ ] **Gmail/SendGrid** (Email Service)
- [ ] **Domain: onlyinternship.in**
- [ ] **SSL Certificate**

### Development Environment
- [ ] Node.js 16+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 🏗️ Project Structure

```
onlyinternship-in/
├── frontend/                 # React.js Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── build/
├── backend/                  # Node.js Backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── docs/                     # Documentation
├── README.md
└── DEPLOYMENT.md
```

## 🔧 Phase 1: Environment Setup

### 1.1 Frontend Environment Variables
Create `.env` file in frontend directory:

```env
REACT_APP_API_URL=https://api.onlyinternship.in
REACT_APP_RAZORPAY_KEY=rzp_live_YOUR_LIVE_KEY
REACT_APP_RAZORPAY_SECRET=YOUR_LIVE_SECRET
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 1.2 Backend Environment Variables
Create `.env` file in backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/onlyinternship

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET

# Email Configuration (Gmail)
EMAIL_USER=noreply@onlyinternship.in
EMAIL_PASS=your-app-specific-password
EMAIL_SERVICE=gmail

# Frontend URL
FRONTEND_URL=https://onlyinternship.in

# Security
CORS_ORIGIN=https://onlyinternship.in
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🗄️ Phase 2: Database Setup

### 2.1 MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Create new cluster (M0 Free tier)

2. **Database Configuration**
   ```bash
   # Connect to MongoDB Atlas
   mongodb+srv://username:password@cluster.mongodb.net/onlyinternship
   ```

3. **Create Collections**
   ```javascript
   // Run in MongoDB Compass or Atlas Shell
   use onlyinternship
   
   // Collections will be created automatically by Mongoose
   // users, questions, tests, payments, results
   ```

4. **Set Up Database User**
   - Create database user with read/write permissions
   - Whitelist your server IP address

### 2.2 Initial Data Setup

```javascript
// Create admin user
db.users.insertOne({
  email: "admin@onlyinternship.in",
  username: "admin",
  password: "$2a$12$hashedpassword",
  role: "admin",
  name: "Admin User",
  active: true,
  createdAt: new Date()
})

// Insert sample questions (35 questions)
// Use the question bank from src/utils/questionBank.js
```

## 💳 Phase 3: Payment Integration

### 3.1 Razorpay Setup

1. **Create Razorpay Account**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
   - Complete KYC verification
   - Get live API keys

2. **Configure Webhooks**
   ```
   Webhook URL: https://api.onlyinternship.in/api/webhooks/razorpay
   Events: payment.captured, payment.failed, refund.processed
   ```

3. **Test Payment Flow**
   ```bash
   # Test with test keys first
   REACT_APP_RAZORPAY_KEY=rzp_test_...
   RAZORPAY_KEY_ID=rzp_test_...
   ```

### 3.2 GST Compliance

1. **Company Details**
   - Company: Yuga Yatra Retail (OPC) Private Limited
   - GST Number: [Add your GST number]
   - Address: [Add company address]

2. **Invoice Configuration**
   - Set up automatic invoice generation
   - Configure GST calculation (18%)
   - Set up invoice templates

## 📧 Phase 4: Email Configuration

### 4.1 Gmail Setup

1. **Create App Password**
   - Go to Google Account Settings
   - Enable 2-factor authentication
   - Generate app-specific password

2. **Configure Nodemailer**
   ```javascript
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: 'noreply@onlyinternship.in',
       pass: 'your-app-specific-password'
     }
   });
   ```

### 4.2 Email Templates

Create email templates for:
- OTP verification
- Test results
- Payment confirmation
- Refund confirmation
- Welcome emails

## 🌐 Phase 5: Domain & SSL Setup

### 5.1 Domain Configuration

1. **Purchase Domain**
   - Buy `onlyinternship.in` from domain registrar
   - Set up DNS records

2. **DNS Configuration**
   ```
   A Record: @ → Your server IP
   CNAME: www → onlyinternship.in
   CNAME: api → api.onlyinternship.in
   ```

### 5.2 SSL Certificate

1. **Let's Encrypt SSL**
   ```bash
   # Install Certbot
   sudo apt-get install certbot
   
   # Generate SSL certificate
   sudo certbot certonly --standalone -d onlyinternship.in -d www.onlyinternship.in
   ```

2. **Auto-renewal**
   ```bash
   # Add to crontab
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 🖥️ Phase 6: Server Deployment

### 6.1 Hostinger Shared Hosting

1. **Upload Frontend**
   ```bash
   # Build React app
   cd frontend
   npm run build
   
   # Upload build folder to public_html
   ```

2. **Configure .htaccess**
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### 6.2 VPS Deployment (Alternative)

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Deploy Backend**
   ```bash
   # Clone repository
   git clone https://github.com/your-org/onlyinternship-backend.git
   cd onlyinternship-backend
   
   # Install dependencies
   npm install
   
   # Start with PM2
   pm2 start server.js --name "onlyinternship-api"
   pm2 startup
   pm2 save
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name api.onlyinternship.in;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔒 Phase 7: Security Configuration

### 7.1 Security Headers

```javascript
// In backend/server.js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://checkout.razorpay.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### 7.2 Rate Limiting

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
```

### 7.3 CORS Configuration

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 📊 Phase 8: Monitoring & Analytics

### 8.1 Google Analytics

1. **Set up GA4**
   - Create Google Analytics account
   - Add tracking code to frontend
   - Configure goals and events

2. **Track Key Events**
   - User registrations
   - Test completions
   - Payment conversions
   - Page views

### 8.2 Error Monitoring

1. **Sentry Integration**
   ```bash
   npm install @sentry/node @sentry/tracing
   ```

2. **Logging Setup**
   ```javascript
   const winston = require('winston');
   
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

## 🧪 Phase 9: Testing

### 9.1 Pre-deployment Testing

1. **Frontend Testing**
   ```bash
   cd frontend
   npm test
   npm run build
   ```

2. **Backend Testing**
   ```bash
   cd backend
   npm test
   ```

3. **Integration Testing**
   - Test OTP flow
   - Test payment flow
   - Test test completion
   - Test admin functions

### 9.2 Security Testing

1. **Vulnerability Scan**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Penetration Testing**
   - Test authentication
   - Test authorization
   - Test input validation
   - Test SQL injection

## 🚀 Phase 10: Go Live

### 10.1 Final Checklist

- [ ] All environment variables configured
- [ ] Database populated with questions
- [ ] Payment gateway tested
- [ ] Email service working
- [ ] SSL certificate installed
- [ ] Domain pointing to server
- [ ] Monitoring tools active
- [ ] Backup strategy in place

### 10.2 Launch Steps

1. **Switch to Live Keys**
   ```env
   RAZORPAY_KEY_ID=rzp_live_...
   REACT_APP_RAZORPAY_KEY=rzp_live_...
   ```

2. **Update DNS Records**
   - Point domain to live server
   - Wait for DNS propagation (24-48 hours)

3. **Monitor Performance**
   - Check server response times
   - Monitor error rates
   - Track user registrations

### 10.3 Post-Launch

1. **Performance Optimization**
   - Enable CDN for static assets
   - Implement caching strategies
   - Optimize database queries

2. **Regular Maintenance**
   - Weekly security updates
   - Monthly backup verification
   - Quarterly performance review

## 📞 Support & Maintenance

### Contact Information
- **Technical Support**: tech@onlyinternship.in
- **Business Inquiries**: business@onlyinternship.in
- **Emergency**: +91-XXXXXXXXXX

### Maintenance Schedule
- **Daily**: Monitor logs and performance
- **Weekly**: Security updates and backups
- **Monthly**: Performance optimization
- **Quarterly**: Security audit and penetration testing

## 🔄 Backup & Recovery

### 1. Database Backup
```bash
# Automated MongoDB backup
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/onlyinternship" --out=/backup/$(date +%Y%m%d)
```

### 2. File Backup
```bash
# Backup application files
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/onlyinternship/
```

### 3. Recovery Plan
1. Restore database from backup
2. Redeploy application code
3. Verify all services are running
4. Test critical functionality

---

## 🎉 Congratulations!

Your OnlyInternship.in platform is now live and ready to serve students and administrators. Remember to:

- Monitor the platform regularly
- Keep security patches updated
- Maintain regular backups
- Gather user feedback for improvements
- Scale infrastructure as needed

For any issues or questions, refer to the documentation or contact the support team. 