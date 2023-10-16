import express from 'express';
import { BlastService } from '../services/blast.service.js';

export class BlastRoute {
  private router;
  private blastService: BlastService;
  constructor() {
    this.router = express.Router();
    this.router.get('/newest', this.listNewest.bind(this));
    this.blastService = new BlastService();
  }

  async listNewest(req: express.Request, res: express.Response) {
    try {
      const { offset, limit } = req.query;
      const { data, total } = await this.blastService.listNewest({
        offset: Number(offset),
        limit: Number(limit),
      });
      res.json({
        items: data.map((item) => item.toJSON()),
        total,
      });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  getRouter() {
    return this.router;
  }
}
