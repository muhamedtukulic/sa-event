const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./user.model');
const Comment = require('./comment.model');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


app.use(express.json());

// Serve static files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, '..')));

// Load signup.html on root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'signup.html'));
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { name, surname, email, password } = req.body;
  
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
  
    try {
      const user = new User({ name, surname, email, password });
      await user.save();
      console.log('📝 New user:', { name, surname, email });
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Signup failed' });
    }
  });    

// POST /api/comment
app.post('/api/comment', async (req, res) => {
    const { nameOrEmail, text } = req.body;
  
    if (!nameOrEmail || !text) {
      return res.status(400).json({ message: 'Missing fields' });
    }
  
    try {
      const comment = new Comment({ nameOrEmail, text });
      await comment.save();
      console.log('💬 New comment:', { nameOrEmail, text });
      res.status(201).json({ message: 'Comment saved' });
    } catch (err) {
      console.error('Comment error:', err);
      res.status(500).json({ message: 'Failed to save comment' });
    }
  });

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error('Failed to fetch comments:', err);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

  
// Another example POST endpoint
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  console.log('Message received:', message);
  res.status(200).json({ status: 'Message received' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
