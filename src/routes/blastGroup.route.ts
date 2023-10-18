import express from 'express';
import { BlastGroupService } from '../services/index.js';

export class BlastGroupRoute {
  private router;
  private blastGroupService: BlastGroupService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.blastGroupService = new BlastGroupService();
  }

  async list(req: express.Request, res: express.Response) {
    try {
      const { offset, limit, unlimited } = req.query;
      const { data, total } = await this.blastGroupService.getBlastGroups({
        offset: Number(offset),
        limit: Number(limit),
        unlimited: unlimited === 'true',
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
