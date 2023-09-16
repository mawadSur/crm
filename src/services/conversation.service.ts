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
    return ConversationModel.findOne({ customerId }).lean().exec();
  }

  async sendMessage(customerId, newMessage, sender) {
    try {
      let conversation = await ConversationModel.findOne({ customerId });
      const customer = await CustomerModel.findById(customerId);
      const customerPhoneNumber = customer.phone;

      if (!conversation) {
        conversation = new ConversationModel({
          customerId: customerId,
          messages: [],
          createdAt: new Date(),
        });
      }

      conversation.messages.push({
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
      console.log('error', error);
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async sendToPhoneNumber(phoneNumber, context) {
    try {
      const response = await httpRequest.post(
        process.env.AWS_SEND_MESSAGE_URI,
        JSON.stringify({
          action: 'send',
          phone: phoneNumber,
          context: context,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          maxBodyLength: Infinity,
        },
      );

      if (response.status !== 200) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      console.log('Message sent successfully to phone number:', phoneNumber);
    } catch (error) {
      console.error('Error sending message to phone number:', error?.message);
    }
  }
}
