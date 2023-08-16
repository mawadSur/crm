import express from 'express';
import { CustomerService } from '../services/index.js';
import { IQueryCustomer } from 'src/utils/index.js';

export class CustomerRoute {
  private router;
  private customerService: CustomerService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.customerService = new CustomerService();
  }

  async list(req: express.Request, res: express.Response) {
    try {
      const { offset, limit, ...rest } = req.query;
      const { data, total } = await this.customerService.list({
        offset: Number(offset),
        limit: Number(limit),
        query: rest,
      } as IQueryCustomer);
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
