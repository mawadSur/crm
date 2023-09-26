import express from 'express';
import { AppointmentRoute } from './appointment.route.js';
import { ChatRoute } from './chat.route.js';
import { CustomerRoute } from './customer.route.js';
import { DesklogRoute } from './desklog.route.js';
import { CarsRoute } from './cars.route.js';
import { BlastRoute } from './blast.route.js';

export class BaseRoute {
  public router: express.Router;
  private chatRoute: ChatRoute;
  private appointmentRoute: AppointmentRoute;
  private desklogRoute: DesklogRoute;
  private customerRoute: CustomerRoute;
  private carsRoute: CarsRoute;
  private blastRoute: BlastRoute;

  constructor() {
    this.router = express.Router();
    this.chatRoute = new ChatRoute();
    this.appointmentRoute = new AppointmentRoute();
    this.desklogRoute = new DesklogRoute();
    this.customerRoute = new CustomerRoute();
    this.carsRoute = new CarsRoute();
    this.blastRoute = new BlastRoute();
    this.load();
  }

  private load() {
    this.router.use('/chats', this.chatRoute.getRouter());
    this.router.use('/appointments', this.appointmentRoute.getRouter());
    this.router.use('/desklogs', this.desklogRoute.getRouter());
    this.router.use('/customers', this.customerRoute.getRouter());
    this.router.use('/cars', this.carsRoute.getRouter());
    this.router.use('/blasts', this.blastRoute.getRouter());
  }
}
