import express from 'express';
import { upload } from '../core/store/index.js';
import { CarsService } from '../services/index.js';

export class CarsRoute {
  private router;
  private carsService: CarsService;

  constructor() {
    this.router = express.Router();
    // this.router.get('/images', this.getCarImages.bind(this));
    this.router.post('/:id/image/upload', upload.single('image'), this.uploadCarImage.bind(this));
    this.router.delete('/image/delete/:s3Url/:vin', this.deleteCarImage.bind(this));
    this.carsService = new CarsService();
  }

  async deleteCarImage(request: express.Request, res: express.Response) {
    try {
      const data = await this.carsService.deleteImage(request.params.s3Url, request.params.vin);
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

  // async getCarImages(request: express.Request, res: express.Response) {
  //   try {
  //     const vin = request.query.VIN || '';
  //     const data = await this.carsService.list(vin as string);
  //     res.json(data);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error fetching data' });
  //   }
  // }

  getRouter() {
    return this.router;
  }
}
