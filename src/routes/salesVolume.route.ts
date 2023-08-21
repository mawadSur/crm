import express from 'express';
import { AppointmentService, SalesVolumeService } from '../services/index.js';

export class SalesVolumeRoute {
  private router;
  private salesVolumeService: SalesVolumeService;

  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.salesVolumeService = new SalesVolumeService();
  }

  async list(req: express.Request, res: express.Response) {
    try {
      const { offset, limit } = req.query;
      const { data, total } = await this.salesVolumeService.list({
        offset: Number(offset),
        limit: Number(limit),
      });
      res.json({
        items: data,
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
