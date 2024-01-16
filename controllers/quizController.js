const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

//create quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions, professor_id } = req.body;

    // Map the provided questions to their corresponding Question documents
    const questionIds = await Promise.all(questions.map(async (question) => {
      const { text, options } = question;

      const newQuestion = new Question({
        text,
        options,
      });

      const savedQuestion = await newQuestion.save();
      return savedQuestion._id;
    }));

    // Create the quiz using the mapped questionIds
    const quiz = new Quiz({
      title,
      questions: questionIds,
      professor: professor_id,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    // finding the quiz by id
    const quiz = await Quiz.findById(req.params.quizId);
    // finding the questions by id
    const questions = await Question.find({ _id: { $in: quiz.questions } });
    // adding the questions to the quiz
    quiz.questions = questions;
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      req.body,
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};