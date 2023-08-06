import express from 'express';
import { AppointmentRoute } from './appointment.route.js';
import { ChatRoute } from './chat.route.js';

export class BaseRoute {
  public router: express.Router;
  private chatRoute: ChatRoute;
  private appointmentRoute: AppointmentRoute;

  constructor() {
    this.router = express.Router();
    this.chatRoute = new ChatRoute();
    this.appointmentRoute = new AppointmentRoute();
    this.load();
  }

  private load() {
    this.router.use('/chats', this.chatRoute.getRouter());
    this.router.use('/appointments', this.appointmentRoute.getRouter());
  }
}
