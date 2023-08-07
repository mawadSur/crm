import { ChatRoute } from './chat.route.js';
import express from 'express';

export class BaseRoute {
  public router: express.Router;
  private chatRoute: ChatRoute;

  constructor() {
    this.router = express.Router();
    this.chatRoute = new ChatRoute();
    this.load();
  }

  private load() {
    this.router.use('/chats', this.chatRoute.getRouter());
  }
}
