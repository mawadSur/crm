import mongoose from 'mongoose';
import { ConversationModel, CustomerModel } from '../models/index.js';
import httpRequest from '../libs/httpsRequest.js';
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

  async getChat(customerId) {
    return ConversationModel.findOne({ customer_id: customerId });
  }

  async sendMessage(customerId, newMessage, sender) {
    try {
      let conversation = await ConversationModel.findOne({ customer_id: customerId });
      const customer = await CustomerModel.findById(customerId);

      const customerPhoneNumber = customer.phone;

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

      if (customerPhoneNumber) {
        await this.sendToPhoneNumber(customerPhoneNumber, newMessage);
      }

      return conversation;
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async sendToPhoneNumber(phoneNumber, context) {
    const apiUrl = 'https://prnnfaqhaojrjnxqtrhr6lirpq0qclho.lambda-url.us-east-1.on.aws/';

    const payload = {
      action: 'send',
      phone: phoneNumber,
      context: context,
    };

    try {
      const response = await httpRequest.post(apiUrl, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
        maxBodyLength: Infinity,
      });

      if (response.status !== 200) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      console.log('Message sent successfully to phone number:', phoneNumber);
    } catch (error) {
      console.error('Error sending message to phone number:', error);
    }
  }
}
