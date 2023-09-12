import express from 'express';
import { AppointmentService, DesklogService } from '../services/index.js';

export class DesklogRoute {
  private router;
  private desklogService: DesklogService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.router.put('/updateSaleStatus/:logId', this.updateSaleStatus.bind(this));
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

  async updateSaleStatus(req, res) {
    try {
      const { logId } = req.params;
      const { saleStatus } = req.body;

      const updatedLog = await this.desklogService.updateSaleStatus(logId, saleStatus);

      if (updatedLog) {
        res.json({ message: 'Sale status updated successfully', log: updatedLog });
      } else {
        res.status(404).json({ message: 'Log entry not found' });
      }
    } catch (error) {
      console.error('Error updating sale status:', error);
      res.status(500).json({ message: error });
    }
  }

  getRouter() {
    return this.router;
  }
}
