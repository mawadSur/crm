import { CustomerModel } from '../models/index.js';

export class CustomersService {
  constructor() {}

  async list() {
    return CustomerModel.find();
  }
}
