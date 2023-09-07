import { IQuery } from 'src/utils/interfaces/index.js';
import { CarModel } from '../models/index.js';

export class CarsService {
  constructor() {}

  async list(query: IQuery): Promise<{
    data: any[];
    total: number;
  }> {
    console.log('Finding data in mongo');

    const data = CarModel.find({ VIN: 'df' });

    const total = await CarModel.countDocuments();

    return {} as {
      data: any[];
      total: number;
    };
  }

  // async list1(query: IQuery): Promise<{
  //   data: any[];
  //   total: number;
  // }> {
  //   const data = await AppointmentModel.find()
  //     .populate([
  //       {
  //         path: 'carId',
  //         model: 'Car',
  //       },
  //       {
  //         path: 'salesRepId',
  //         model: 'SalesRep',
  //       },
  //     ])
  //     .sort({
  //       time: -1,
  //     })
  //     .skip(query.offset)
  //     .limit(query.limit)
  //     .exec();
  //   const total = await AppointmentModel.countDocuments();
  //   return {
  //     data,
  //     total,
  //   };
  // }
}
