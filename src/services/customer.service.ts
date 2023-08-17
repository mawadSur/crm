import { IQuery, IQueryCustomer } from '../utils/index.js';
import { CustomerModel } from '../models/index.js';

export class CustomerService {
  constructor() {}

  async list({ query }: IQueryCustomer) {
    const total = await CustomerModel.countDocuments();
    const queryOptions: any = {};

    if (query?.name) {
      queryOptions.name = {
        $regex: query.name,
        $options: 'i',
      };
    }
    if (query?.age) {
      queryOptions.age = {
        $eq: +query.age,
      };
    }
    if (query?.gender) {
      queryOptions.gender = {
        $eq: query.gender,
      };
    }
    if (query?.email) {
      queryOptions.email = {
        $regex: query.email,
        $options: 'i',
      };
    }
    if (query?.sourceOfLead) {
      queryOptions.sourceOfLead = {
        $eq: query.sourceOfLead,
      };
    }

    //TODO update more conditions to query options

    const data = await CustomerModel.find(queryOptions).exec();
    return {
      data,
      total,
    };
  }
}
