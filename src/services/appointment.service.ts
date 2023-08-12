import { IQuery } from 'src/utils/interfaces/index.js';
import { Appointment, AppointmentModel } from '../models/index.js';

export class AppointmentService {
  constructor() {}

  async list(query: IQuery): Promise<{
    data: any[];
    total: number;
  }> {
    const data = await AppointmentModel.find()
      .populate([
        {
          path: 'carId',
          model: 'Car',
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
    const total = await AppointmentModel.countDocuments();
    return {
      data,
      total,
    };
  }
}
