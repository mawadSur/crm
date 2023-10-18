import { BlastGroupModel } from '../models/index.js';
import { IQuery } from '../utils/interfaces/index.js';

export class BlastGroupService {
  constructor() {}

  async getBlastGroups(query: IQuery): Promise<{
    data: any[];
    total: number;
  }> {
    console.log('query', query);
    const _query: any = BlastGroupModel.find();

    if (!query?.unlimited) {
      _query.limit(query?.limit ?? 10);
      _query.offset(query?.offset ?? 0);
    }
    const data = await _query
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: 'blastIds',
          model: 'Blast',
          populate: {
            path: 'customerId',
            model: 'Customers',
          },
        },
      ])
      .exec();

    const total = await BlastGroupModel.countDocuments();
    return {
      data,
      total,
    };
  }
}
