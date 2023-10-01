import httpRequest from '../libs/httpsRequest.js';
import { convertSnakeToCamel } from '../utils/functions.js';
import { CarVinInfoInternal } from '../utils/index.js';

export class CarsxeService {
  private API_URI = process.env.CARSXE_API_URI;
  private KEY = process.env.CARSXE_KEY;
  constructor() {}

  async getSpecByVin(vin: string): Promise<CarVinInfoInternal | {}> {
    const response = await httpRequest.get(`${this.API_URI}/specs?key=${this.KEY}&vin=${vin}`);
    if (response?.data?.success) {
      const data = {
        attributes: response.data.attributes,
        colors: response.data.colors,
        equipment: response.data.equipment,
        warranties: response.data.warranties,
      };
      return convertSnakeToCamel(data) as CarVinInfoInternal;
    } else {
      return {};
    }
  }
}
