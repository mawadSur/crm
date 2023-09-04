import express from 'express';
import { ConversationService, CustomerService } from '../services/index.js';
import { IQueryCustomer } from 'src/utils/index.js';
import Joi from 'joi';

export class CustomerRoute {
  private router;
  private customerService: CustomerService;
  private conversationService: ConversationService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.router.get('/:customerId/conversations', this.getCustomerConversations.bind(this));
    this.router.get('/:customerId/services', this.getCustomerServices.bind(this));
    this.router.post('/launch', this.launchCampaign.bind(this));
    this.customerService = new CustomerService();
    this.conversationService = new ConversationService();
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

  async launchCampaign(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      customerIds: Joi.array().items(Joi.string()).required(),
      context: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.customerService.launchCampaign(value);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error while launching campaign' });
    }
  }

  async getCustomerConversations(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      customerId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.conversationService.getConversationByCustomerId(value.customerId);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error fetching conversation' });
    }
  }

  async getCustomerServices(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      customerId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.customerService.getCustomerServices(value.customerId, req.query);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error fetching conversation' });
    }
  }

  getRouter() {
    return this.router;
  }
}
