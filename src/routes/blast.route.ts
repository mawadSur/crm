import express from 'express';
import { BlastService } from '../services/blast.service.js';

export class BlastRoute {
  private router;
  private blastService: BlastService;
  constructor() {
    this.router = express.Router();
    this.router.get('/:id', this.getBlast.bind(this));
    this.blastService = new BlastService();
  }

  async getBlast(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const blast = await this.blastService.getBlast(id);
      res.json({
        blast: blast.toJSON(),
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
