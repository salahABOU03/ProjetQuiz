const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/quiz', quizRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
