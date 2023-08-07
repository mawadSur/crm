import { DeskLogModel } from '../models/index.js';
import { IQuery } from '../utils/interfaces/index.js';

export class DesklogService {
  constructor() {}

  async list(query: IQuery): Promise<{
    data: any[];
    total: number;
  }> {
    const data = await DeskLogModel.find()
      .populate([
        {
          path: 'vehicleId',
          model: 'Car',
        },
        {
          path: 'customerId',
          model: 'Customers',
        },
        {
          path: 'salesRepId',
          model: 'SalesRep',
        },
      ])
      .sort({
        time: -1,
      })
      .skip(query.offset)
      .limit(query.limit)
      .exec();
    const total = await DeskLogModel.countDocuments();
    return {
      data,
      total,
    };
  }
}
