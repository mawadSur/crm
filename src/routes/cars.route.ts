import express from 'express';
// import { ConversationService } from '../services/index.js';
import { CarsService } from '../services/index.js';

export class CarsRoute {
  private router;
  private carsService: CarsService;

  constructor() {
    this.router = express.Router();
    this.router.get('/images', this.getCarImages.bind(this));
    this.carsService = new CarsService();
  }

  async getCarImages(_: express.Request, res: express.Response) {
    try {
      console.log('In car images');
      const data = await this.carsService.list(null);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  // async getChats(_: express.Request, res: express.Response) {
  //   try {
  //     const data = await this.conversationService.list();
  //     res.json(data);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error fetching data' });
  //   }
  // }

  getRouter() {
    return this.router;
  }
}
