import { ConversationModel } from '../models/index.js';

export class ConversationService {
  constructor() {}

  async list() {
    return ConversationModel.find();
  }

  async getChat(customerId) {
    return ConversationModel.findOne({ customer_id: customerId });
  }
}
