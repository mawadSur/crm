import { ConversationModel } from '../models/index.js';

export class ConversationService {
  constructor() {}

  async list() {
    return ConversationModel.find();
  }
}
