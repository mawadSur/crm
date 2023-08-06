import { ResourceWithOptions } from 'adminjs';
import { ConversationModel } from '../models/index.js';

export const ChatConversationResource: ResourceWithOptions = {
  resource: ConversationModel,
  options: {
    properties: {
      id: {
        isVisible: { show: true, edit: false, list: true },
      },
      customerId: {
        isVisible: { show: true, edit: true, list: true },
      },
      messages: {
        isVisible: { show: true, edit: false, list: true },
      },
      createdAt: {
        isVisible: { show: true, edit: false, list: true },
      },
    },
  },
};

export default ChatConversationResource;
