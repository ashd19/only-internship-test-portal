# OnlyInternship.in - Detailed System Flow Chart

## 🏠 **HOME PAGE FLOW**

```
┌─────────────────────────────────────────────────────────────┐
│                    ONLYINTERNSHIP.IN                        │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   STUDENT       │    │     ADMIN       │                │
│  │    LOGIN        │    │     LOGIN       │                │
│  │                 │    │                 │                │
│  │  📧 Email       │    │  🔐 Username    │                │
│  │  🔑 OTP         │    │  🔑 Password    │                │
│  └─────────────────┘    └─────────────────┘                │
│                                                             │
│  📋 Test Info: 35 Questions • 30 Minutes • ₹250            │
│  ⚠️  Terms & Conditions • GST Compliant                    │
└─────────────────────────────────────────────────────────────┘
```

## 👨‍🎓 **STUDENT FLOW**

```
┌─────────────────────────────────────────────────────────────┐
│                    STUDENT JOURNEY                          │
└─────────────────────────────────────────────────────────────┘

1. EMAIL AUTHENTICATION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Enter Email │───▶│ Send OTP    │───▶│ Verify OTP  │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📧 Email Sent        ✅ Login Success

2. PROFILE CREATION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Basic Info  │───▶│ Save Profile│───▶│ Dashboard   │
   │ - Name      │    │             │    │             │
   │ - Phone     │    │             │    │             │
   │ - College   │    │             │    │             │
   └─────────────┘    └─────────────┘    └─────────────┘

3. TEST REGISTRATION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ View Tests  │───▶│ Select Test │───▶│ Terms &     │
   │ Available   │    │ Available   │    │ Agreement   │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ⚠️  Warnings:           ✅ Accept
                       - No Electronics       Terms
                       - No Screenshots
                       - No Cheating

4. PAYMENT FLOW
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ ₹250 + GST  │───▶│ Razorpay    │───▶│ Payment     │
   │ Test Fee    │    │ Gateway     │    │ Success     │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ❌ Payment Failed    ✅ Test Enabled
                       (Retry/Refund)      (Admin Approval)

5. TEST EXECUTION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Start Test  │───▶│ 35 Questions│───▶│ Auto-Save   │
   │ 30 Min Timer│    │ Random Mix  │    │ Answers     │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ⚠️  Anti-Cheating    🔄 Page Reload
                       - 3 Warnings        - Auto-Recovery
                       - Activity Monitor  - Continue Test

6. TEST COMPLETION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Time Up /   │───▶│ Auto Submit │───▶│ Results     │
   │ Manual      │    │ Answers     │    │ Display     │
   │ Submit      │    │             │    │             │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📧 Email Results    📊 Pass/Fail
                       Sent to Student     + Correct Answers

7. RESULTS & RETRY
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ View Results│───▶│ Pass/Fail   │───▶│ Max 3       │
   │ + Answers   │    │ Status      │    │ Attempts    │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ✅ Pass: Success    ❌ Fail: Retry
                       📧 Certificate      (After Cooldown)
```

## 👨‍💼 **ADMIN FLOW**

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                          │
└─────────────────────────────────────────────────────────────┘

1. ADMIN LOGIN
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Username    │───▶│ Password    │───▶│ Dashboard   │
   │ Password    │    │ Verification│    │ Access      │
   └─────────────┘    └─────────────┘    └─────────────┘

2. DASHBOARD OVERVIEW
   ┌─────────────────────────────────────────────────────────┐
   │                    ADMIN PANEL                          │
   │                                                         │
   │  📊 Statistics:                                         │
   │  - Total Candidates                                     │
   │  - Tests Completed                                      │
   │  - Pass/Fail Ratio                                      │
   │  - Revenue Generated                                     │
   │                                                         │
   │  🔧 Quick Actions:                                      │
   │  - Enable/Disable Tests                                 │
   │  - View Merit List                                      │
   │  - Monitor Activities                                   │
   │  - Manage Questions                                     │
   └─────────────────────────────────────────────────────────┘

3. TEST MANAGEMENT
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ View        │───▶│ Enable/     │───▶│ Monitor     │
   │ Pending     │    │ Disable     │    │ Active      │
   │ Payments    │    │ Tests       │    │ Tests       │
   └─────────────┘    └─────────────┘    └─────────────┘

4. CANDIDATE MONITORING
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ View All    │───▶│ Track       │───▶│ Generate    │
   │ Candidates  │    │ Progress    │    │ Reports     │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📊 Real-time Stats    📈 Analytics
                       - Test Status        - Performance
                       - Suspicious Activity│ - Merit List

5. MERIT LIST SYSTEM
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Calculate   │───▶│ Percentile  │───▶│ Display     │
   │ Scores      │    │ Rankings    │    │ Merit List  │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📊 Score Analysis    🏆 Top Performers
                       - Easy/Moderate/     - Percentile Ranks
                       - Expert Questions   - Performance Trends
```

## 🔄 **SYSTEM FLOW**

```
┌─────────────────────────────────────────────────────────────┐
│                    SYSTEM ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────┘

1. DATABASE STRUCTURE
   ┌─────────────────────────────────────────────────────────┐
   │                    MONGODB DATABASE                     │
   │                                                         │
   │  👥 Users Collection:                                   │
   │  - Student Profiles                                     │
   │  - Admin Accounts                                       │
   │  - Test Attempts                                        │
   │  - Payment Records                                      │
   │                                                         │
   │  📝 Questions Collection:                               │
   │  - Easy (33%)                                           │
   │  - Moderate (34%)                                       │
   │  - Expert (33%)                                         │
   │  - Random Selection                                     │
   │                                                         │
   │  📊 Results Collection:                                 │
   │  - Test Scores                                          │
   │  - Merit Rankings                                       │
   │  - Performance Analytics                                │
   └─────────────────────────────────────────────────────────┘

2. QUESTION SELECTION ALGORITHM
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Start Test  │───▶│ Random      │───▶│ 35 Questions│
   │ Request     │    │ Selection   │    │ Generated   │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📊 Difficulty Mix    🔄 Unique Set
                       - 12 Easy           - No Duplicates
                       - 12 Moderate       - Balanced Mix
                       - 11 Expert         - Time Stamped

3. ANTI-CHEATING SYSTEM
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Monitor     │───▶│ Detect      │───▶│ Take Action │
   │ Activity    │    │ Suspicious  │    │             │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ⚠️  Warning System    🚫 Final Action
                       - Tab Switching      - Auto Submit
                       - Screenshot Attempt │ - Disqualify
                       - Multiple Windows   │ - Report Admin

4. AUTO-SAVE MECHANISM
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ User Input  │───▶│ Local       │───▶│ Server      │
   │ Answer      │    │ Storage     │    │ Sync        │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       💾 Browser Cache    🔄 Recovery
                       - Every 30 seconds  - Page Reload
                       - Network Failure   - Continue Test
                       - Power Loss        - Resume Progress
```

## 💳 **PAYMENT FLOW**

```
┌─────────────────────────────────────────────────────────────┐
│                    RAZORPAY INTEGRATION                     │
└─────────────────────────────────────────────────────────────┘

1. PAYMENT INITIATION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ ₹250 + GST  │───▶│ Razorpay    │───▶│ Payment     │
   │ Test Fee    │    │ Order       │    │ Gateway     │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📋 Order Details    🔗 Payment Link
                       - Amount: ₹250      - UPI/Card/NetBanking
                       - GST: ₹45          - Secure Gateway
                       - Total: ₹295       - SSL Encrypted

2. PAYMENT PROCESSING
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ User        │───▶│ Razorpay    │───▶│ Payment     │
   │ Payment     │    │ Processing  │    │ Success/    │
   │ Method      │    │             │    │ Failure     │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       🔄 Processing        ✅ Success
                       - Verification       - Test Enabled
                       - Bank Approval      - Admin Notification
                       - Transaction ID     - Email Receipt

3. REFUND POLICY
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Refund      │───▶│ Check       │───▶│ Process     │
   │ Request     │    │ Eligibility │    │ Refund      │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ❌ Not Eligible      ✅ Eligible
                       - Test Started       - Test Not Initiated
                       - Time Elapsed       - Technical Issues
                       - No Refund          - Full Refund
```

## 🔒 **SECURITY FEATURES**

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY FRAMEWORK                       │
└─────────────────────────────────────────────────────────────┘

1. AUTHENTICATION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Email       │───▶│ OTP         │───▶│ Session     │
   │ Verification│    │ Generation  │    │ Management  │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       🔐 Secure OTP        ⏰ Session Timeout
                       - 6-digit Code       - Auto Logout
                       - 10-min Expiry      - Token Refresh
                       - Rate Limiting      - Secure Cookies

2. ANTI-CHEATING
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Activity    │───▶│ Detection   │───▶│ Action      │
   │ Monitoring  │    │ Algorithm   │    │ System      │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       ⚠️  3-Strike System   🚫 Final Action
                       - Warning 1          - Auto Submit
                       - Warning 2          - Disqualify
                       - Warning 3          - Report Admin

3. DATA PROTECTION
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Input       │───▶│ Validation  │───▶│ Encryption  │
   │ Sanitization│    │ & Filtering │    │ & Storage   │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       🛡️  XSS Protection    🔒 Data Encryption
                       - SQL Injection      - AES-256
                       - CSRF Tokens        - Secure Headers
                       - Input Validation   - HTTPS Only
```

## 📱 **RESPONSIVE DESIGN**

```
┌─────────────────────────────────────────────────────────────┐
│                    RESPONSIVE LAYOUT                        │
└─────────────────────────────────────────────────────────────┘

1. DEVICE COMPATIBILITY
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Desktop     │    │ Tablet      │    │ Mobile      │
   │ (1200px+)   │    │ (768px)     │    │ (480px)     │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       🖥️  Full Layout       📱 Mobile Optimized
                       - Sidebar Nav        - Hamburger Menu
                       - Multi-column       - Single Column
                       - Hover Effects      - Touch Friendly

2. TEST INTERFACE
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Question    │    │ Timer       │    │ Navigation  │
   │ Display     │    │ Display     │    │ Panel       │
   └─────────────┘    └─────────────┘    └─────────────┘
                              │                   │
                              ▼                   ▼
                       📝 Readable Text      ⏱️  Prominent Timer
                       - Large Fonts         - Countdown Display
                       - High Contrast       - Warning Alerts
                       - Zoom Disabled       - Auto Submit
```

This comprehensive flow chart provides a complete visual representation of the onlyinternship.in platform architecture, user journeys, and system interactions. Each component is designed to work seamlessly with the others while maintaining security, user experience, and business requirements. 