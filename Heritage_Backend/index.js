// index.js
// Entry point and Express server configurations for the HeritageAI Pakistan API

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const siteRoutes = require('./routes/siteRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const aiRoutes = require('./routes/aiRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// 1. Database Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/heritage_db';
mongoose.connect(mongoUri)
  .then(() => console.log('Successfully connected to MongoDB database.'))
  .catch(err => console.error('MongoDB database connection failure:', err));

// 2. Global Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Permit React development client requests
  credentials: true
}));

app.use(express.json());

// 3. API Route Bindings
app.use('/api/auth', authRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ai', aiRoutes);

// Base route for server health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'HeritageAI API service is healthy' });
});

// 4. Centralized Error Handling Middleware (must be registered last)
app.use(errorMiddleware);

// 5. Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`HeritageAI Pakistan API Server is running on port ${PORT}`);
});
