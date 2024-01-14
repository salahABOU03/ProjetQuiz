const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, username, password, role } = req.body;
    const user = await new User({fullName,username,password,role});
    await user.save();
    res.status(201).json({"message": "User created"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
