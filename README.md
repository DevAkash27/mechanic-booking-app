# 🔧 Mechanic Booking App

A comprehensive mobile booking platform for solo mechanics. Users can browse services, book appointments, select time slots, and make payments. Includes admin panel for service management.

## 🏗️ Architecture

```
mechanic-booking-app/
├── backend/                    # Node.js + Express API
├── customer-app/               # React Native (iOS + Android)
├── admin-panel/                # React.js web dashboard
└── docs/                       # Documentation
```

## 🛠️ Tech Stack

- **Mobile App**: React Native (Expo)
- **Admin Panel**: React.js + Ant Design
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Auth**: Firebase OTP
- **Payments**: Razorpay
- **Notifications**: Firebase Cloud Messaging
- **Storage**: Cloudinary

## 📋 Features

### Customer App
- ✅ OTP-based authentication
- ✅ Vehicle management
- ✅ Service browsing & filtering
- ✅ Booking with time slot selection
- ✅ Razorpay payment integration
- ✅ Real-time booking status tracking
- ✅ Invoice generation
- ✅ Push notifications

### Admin Panel
- ✅ Dashboard with key metrics
- ✅ Booking management
- ✅ Service catalog management
- ✅ Pricing management
- ✅ Customer management
- ✅ Revenue reports
- ✅ Coupon/discount management

## 🚀 Quick Start

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
npm run dev
\`\`\`

### Customer App
\`\`\`bash
cd customer-app
npm install
expo start
\`\`\`

### Admin Panel
\`\`\`bash
cd admin-panel
npm install
npm start
\`\`\`

## 📚 Documentation
- [Backend API Docs](./docs/BACKEND_API.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Setup Guide](./docs/SETUP_GUIDE.md)

## 📄 License
MIT
