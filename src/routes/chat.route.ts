import express from 'express';
import { ConversationService } from '../services/index.js';

export class ChatRoute {
  private router;
  private conversationService: ConversationService;

  constructor() {
    this.router = express.Router();
    this.router.get('/getAllChats', this.getChats.bind(this));
    this.router.get('/getChat/:customerId', this.getChat.bind(this));
    this.router.post('/sendMessage/:customerId', this.sendMessage.bind(this));
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

  async getChat(req: express.Request, res: express.Response) {
    try {
      const customerId = req.params.customerId;
      const data = await this.conversationService.getChat(customerId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  async sendMessage(req: express.Request, res: express.Response) {
    try {
      const customerId = req.params.customerId;
      const message = req.body.message;

      // Assuming sender is always 'admin'
      const sender = 'admin';
      const updatedConversation = await this.conversationService.sendMessage(
        customerId,
        message,
        sender,
      );
      res.json(updatedConversation);
    } catch (error) {
      console.log('error ' + error);
      res.status(500).json({ message: 'Error sending message' });
    }
  }

  getRouter() {
    return this.router;
  }
}
