const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, username, password, role } = req.body;
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPass = await bcrypt.hash(password,10);

    const user = await new User({ fullName, username, password:hashedPass, role });
    await user.save();
    res.status(201).json({success:true, message: 'Account created', user });
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({success: false, message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign({user:req.body}, "XYZ", {expiresIn:"20h"});
    res.json({
        success:true,
        token,
        user: userData
    })

   
  }catch (error) {
    res.status(500).json({success: false, error: error.message });
  }
};