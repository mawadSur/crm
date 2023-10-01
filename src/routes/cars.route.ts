import express from 'express';
import Joi from 'joi';
import { upload } from '../core/store/index.js';
import { CarsxeService } from '../services/carsxe.service.js';
import { CarsService } from '../services/index.js';

export class CarsRoute {
  private router;
  private carsService: CarsService;
  private carsxeService: CarsxeService;

  constructor() {
    this.router = express.Router();
    this.carsService = new CarsService();
    this.carsxeService = new CarsxeService();
    this.router.post('/:id/image/upload', upload.single('image'), this.uploadCarImage.bind(this));
    this.router.delete('/:id/image/delete', this.deleteCarImage.bind(this));
    this.router.get('/vin/:vin', this.getInfoByVin.bind(this));
  }

  async deleteCarImage(request: express.Request, res: express.Response) {
    try {
      const data = await this.carsService.deleteImage(
        request.params.id,
        request.query.imageUrl as string,
      );
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  async uploadCarImage(request: express.Request | any, res: express.Response) {
    try {
      const data = await this.carsService.upload(request.file, request.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  async getInfoByVin(req: express.Request, res: express.Response) {
    const schema = Joi.object({
      vin: Joi.string().min(17).max(17).required().messages({
        'string.min': 'vin must be 17 characters',
        'string.max': 'vin must be 17 characters',
      }),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const data = await this.carsxeService.getSpecByVin(value.vin);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  }

  getRouter() {
    return this.router;
  }
}
