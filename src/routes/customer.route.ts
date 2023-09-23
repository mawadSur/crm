import express from 'express';
import Joi from 'joi';
import { IQueryCustomer } from 'src/utils/index.js';
import { ConversationService, CustomerService } from '../services/index.js';

export class CustomerRoute {
  private router;
  private customerService: CustomerService;
  private conversationService: ConversationService;
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.list.bind(this));
    this.router.get('/:customerId/conversations', this.getCustomerConversations.bind(this));
    this.router.get('/:customerId/services', this.getCustomerServices.bind(this));
    this.router.get('/:customerId/insurances', this.getCustomerInsurances.bind(this));
    this.router.get('/:customerId/vehicles', this.getCustomerVehicles.bind(this));
    this.router.get('/:customerId/activities', this.getCustomerActivities.bind(this));
    this.router.post('/launch', this.launchCampaign.bind(this));
    this.router.post('/launch-all', this.launchAllCampaign.bind(this));
    this.customerService = new CustomerService();
    this.conversationService = new ConversationService();
  }

  async list(req: express.Request, res: express.Response) {
    try {
      const { offset, limit, unlimited, ...rest } = req.query;
      const { data, total } = await this.customerService.list({
        unlimited: unlimited === 'true',
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

  async launchAllCampaign(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      context: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.customerService.launchAllCampaign(value);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error while launching all campaign' });
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
      res.status(500).json({ message: 'Error fetching customer services' });
    }
  }

  async getCustomerInsurances(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      customerId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.customerService.getCustomerInsurances(value.customerId, req.query);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error fetching customer insurances' });
    }
  }

  async getCustomerVehicles(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      customerId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.customerService.getCustomerVehicles(value.customerId, req.query);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error fetching customer vehicles' });
    }
  }

  async getCustomerActivities(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      customerId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const result = await this.customerService.getCustomerActivities(value.customerId, req.query);
      res.status(200).json(result);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Error fetching customer activities' });
    }
  }

  getRouter() {
    return this.router;
  }
}
