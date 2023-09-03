import { ConversationModel } from '../models/index.js';

export class ConversationService {
  constructor() {}

  async list() {
    return ConversationModel.find();
  }

  async getConversationByCustomerId(customerId: string) {
    return ConversationModel.findOne({ customerId })
      .sort({
        createdAt: -1,
      })
      .lean()
      .exec();
  }
}
