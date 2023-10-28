const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new message
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newMessage = new Message({ title, content });
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT route for adding likes to a message
router.put('/:id/like', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.likes += 1;
    const updatedMessage = await message.save();
    res.json({ likes: updatedMessage.likes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST route for adding comments to a message
router.post('/:id/comment', async (req, res) => {
  const { comment } = req.body;
  try {
    const message = await Message.findById(req.params.id);
    message.comments.push(comment);
    const updatedMessage = await message.save();
    res.json({ comments: updatedMessage.comments });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
