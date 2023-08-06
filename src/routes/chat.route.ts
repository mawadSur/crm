import express from 'express';
import { ConversationService } from '../services/index.js';

export class ChatRoute {
  private router;
  private conversationService: ConversationService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.getChats.bind(this));
    this.conversationService = new ConversationService();
  }

  async getChats(_: express.Request, res: express.Response) {
    try {
      const data = await this.conversationService.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  getRouter() {
    return this.router;
  }
}
