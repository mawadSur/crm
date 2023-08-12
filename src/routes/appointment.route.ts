import express from 'express';
import { AppointmentService } from '../services/index.js';

export class AppointmentRoute {
  private router;
  private appointmentService: AppointmentService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.appointmentService = new AppointmentService();
  }

  async list(req: express.Request, res: express.Response) {
    try {
      const { offset, limit } = req.query;
      const { data, total } = await this.appointmentService.list({
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
