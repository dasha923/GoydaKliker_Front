const express = require('express');
const router = express.Router();
const { passport, generateToken, registerUser, validateUser } = require('./authService');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await registerUser(username, password);
    res.json({ message: 'Registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await validateUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.json({ message: 'Login successful', token });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Profile accessed', user: req.user });
});

module.exports = router;
