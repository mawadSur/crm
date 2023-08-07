import express from 'express';
import { AppointmentService, DesklogService } from '../services/index.js';

export class DesklogRoute {
  private router;
  private desklogService: DesklogService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.desklogService = new DesklogService();
  }

  async list(req: express.Request, res: express.Response) {
    try {
      const { offset, limit } = req.query;
      const { data, total } = await this.desklogService.list({
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
