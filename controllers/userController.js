const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, username, password, role } = req.body;
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPass = await bcrypt.hash(password,10)

    const user = await new User({ fullName, username, password:hashedPass, role });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(password,user.password);
    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const userData = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
    };
    res.status(200).json({user: userData});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
