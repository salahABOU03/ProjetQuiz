const Attempt = require('../models/Attempt');

// Create a new attempt
const createAttempt = async (req, res) => {
  try {
    const { student, quiz, answers } = req.body;
    const newAttempt = new Attempt({ student, quiz, answers });
    const savedAttempt = await newAttempt.save();
    res.status(201).json(savedAttempt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all attempts
const getAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find();
    res.status(200).json(attempts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get attempts by student ID
const getAttemptsByStudent = async (req, res) => {
  try {
    const attempts = await Attempt.find({ student: req.params.studentId });
    res.status(200).json(attempts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createAttempt,
  getAllAttempts,
  getAttemptsByStudent,
};
