import { ChatRoute } from './chat.route.js';
import { CustomersRoute } from './customer.route.js';
import express from 'express';

export class BaseRoute {
  public router: express.Router;
  private chatRoute: ChatRoute;
  private customersRoute: CustomersRoute;

  constructor() {
    this.router = express.Router();
    this.chatRoute = new ChatRoute();
    this.customersRoute = new CustomersRoute();
    this.load();
  }

  private load() {
    this.router.use('/chats', this.chatRoute.getRouter());
    this.router.use('/customers', this.customersRoute.getRouter());
  }
}
