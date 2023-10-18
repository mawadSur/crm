import { BlastModel } from '../models/index.js';
// import { IQuery } from '../utils/interfaces/index.js';

export class BlastService {
  constructor() {}

  // async listNewest(query: IQuery): Promise<{
  //   data: any[];
  //   total: number;
  // }> {
  //   const data = await BlastModel.find({
  //     isNewest: true,
  //   })
  //     .populate([
  //       {
  //         path: 'customerId',
  //         model: 'Customers',
  //       },
  //     ])
  //     .sort({
  //       time: -1,
  //     })
  //     .skip(query.offset)
  //     .limit(query.limit)
  //     .exec();

  //   const total = await BlastModel.countDocuments({
  //     isNewest: true,
  //   });
  //   return {
  //     data,
  //     total,
  //   };
  // }

  async getBlast(id: string) {
    const blast = await BlastModel.findById(id)
      .populate([
        {
          path: 'customerId',
          model: 'Customers',
        },
      ])
      .exec();
    if (!blast) {
      throw new Error('Blast not found');
    }
    return blast;
  }
}
