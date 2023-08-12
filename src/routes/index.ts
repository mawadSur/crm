import { ChatRoute } from './chat.route.js';
import { CustomersRoute } from './customer.route.js';
import express from 'express';
import { AppointmentRoute } from './appointment.route.js';
import { DesklogRoute } from './desklog.route.js';

export class BaseRoute {
  public router: express.Router;
  private chatRoute: ChatRoute;
  private customersRoute: CustomersRoute;
  private appointmentRoute: AppointmentRoute;
  private desklogRoute: DesklogRoute;

  constructor() {
    this.router = express.Router();
    this.chatRoute = new ChatRoute();
    this.customersRoute = new CustomersRoute();
    this.appointmentRoute = new AppointmentRoute();
    this.desklogRoute = new DesklogRoute();
    this.load();
  }

  private load() {
    this.router.use('/chats', this.chatRoute.getRouter());
    this.router.use('/customers', this.customersRoute.getRouter());
    this.router.use('/appointments', this.appointmentRoute.getRouter());
    this.router.use('/desklogs', this.desklogRoute.getRouter());
  }
}
