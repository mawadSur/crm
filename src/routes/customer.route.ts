import express from 'express';
import { CustomersService } from '../services/index.js';

export class CustomersRoute {
  private router;
  private customerService: CustomersService;

  constructor() {
    this.router = express.Router();
    this.router.get('/getCustomers', this.getCusomers.bind(this));
    this.customerService = new CustomersService();
  }

  async getCusomers(_: express.Request, res: express.Response) {
    try {
      const data = await this.customerService.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  getRouter() {
    return this.router;
  }
}
