import express from 'express';
import { ConversationModel } from '../src/models/index.js';

const chatRouter = express.Router();

chatRouter.get('/chat', async (req, res) => {
  try {
    const data = await ConversationModel.find(); // Perform the database query using model.find()
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

export default chatRouter;
