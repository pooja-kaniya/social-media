const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [String],
});

module.exports = mongoose.model('Message', messageSchema);
