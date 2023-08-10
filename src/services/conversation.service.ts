import mongoose from 'mongoose';
import { ConversationModel } from '../models/index.js';

export class ConversationService {
  constructor() {}

  async list() {
    return ConversationModel.find();
  }

  async getChat(customerId) {
    return ConversationModel.findOne({ customer_id: customerId });
  }

  async sendMessage(customerId, newMessage, sender) {
    try {
      let conversation = await ConversationModel.findOne({ customer_id: customerId });

      console.log(newMessage + 'msg');

      if (!conversation) {
        conversation = new ConversationModel({
          customer_id: customerId,
          messages: [],
          createdAt: new Date(),
        });
      }

      conversation.messages.push({
        id: new mongoose.Types.ObjectId().toString(),
        timestamp: new Date(),
        sender: sender,
        message: newMessage,
      });

      await conversation.save();

      return conversation;
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }
}
