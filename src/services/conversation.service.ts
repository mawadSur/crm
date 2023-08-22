import mongoose from 'mongoose';
import { ConversationModel, CustomerModel } from '../models/index.js';
import fetch from 'node-fetch';

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
      phone: '+14047919415',
      context: context,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      console.log('Message sent successfully to phone number:', phoneNumber);
    } catch (error) {
      console.error('Error sending message to phone number:', error);
    }
  }
}
