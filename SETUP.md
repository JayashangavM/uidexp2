# 🚀 Simple MongoDB Compass Setup

## Quick Start (3 steps)

### 1. Install MongoDB Compass
- Download: https://www.mongodb.com/products/compass
- Install and open MongoDB Compass
- Connect to: `mongodb://localhost:27017`

### 2. Start Backend
```bash
cd online-learning/backend
npm install express mongoose cors
node simple-server.js
```

### 3. Start Frontend
```bash
cd online-learning
npm start
```

## ✅ That's it!

- Open: http://localhost:3000/exp8
- Add/Edit/Delete courses
- View data in MongoDB Compass under `online-learning` database

## 🔧 What happens:
- Frontend loads sample courses OR MongoDB data
- All changes automatically sync to MongoDB Compass
- Works offline with sample data if MongoDB not connected

## 📊 View in MongoDB Compass:
- Database: `online-learning`
- Collection: `courses`
- See your courses data in real-time!
