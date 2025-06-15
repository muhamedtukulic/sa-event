// api/comment.model.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  nameOrEmail: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
