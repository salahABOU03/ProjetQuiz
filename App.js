const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();




app.use(userRoutes);
app.use('/question', questionRoutes);
app.use('/quiz', quizRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
