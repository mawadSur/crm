import { SalesVolumeModel } from '../models/index.js';
import { IQuery } from '../utils/interfaces/index.js';

export class SalesVolumeService {
  constructor() {}

  async list(query: IQuery): Promise<{
    data: any[];
    total: number;
  }> {
    const data = await SalesVolumeModel.find().skip(query.offset).limit(query.limit).exec();
    const total = await SalesVolumeModel.countDocuments();
    return {
      data,
      total,
    };
  }
}
