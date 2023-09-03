import { Schema, model, Document, SchemaDefinitionProperty } from 'mongoose';
import { EConversationSender } from '../utils/index.js';

interface Message {
  id: string;
  timestamp: Date;
  sender: EConversationSender;
  message: string;
}

interface ChatConversation extends Document {
  id: string;
  customerId: SchemaDefinitionProperty<string>;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<Message>({
  id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sender: {
    type: String,
    enum: [EConversationSender.Bot, EConversationSender.Customer],
    required: true,
  },
  message: { type: String, required: true },
});

const chatConversationSchema = new Schema<ChatConversation>(
  {
    id: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customers' },
    messages: [{ type: messageSchema, required: true }],
  },
  {
    timestamps: true,
  },
);

chatConversationSchema.index({
  createdAt: 1,
});
chatConversationSchema.index({
  customerId: 1,
});

export const ConversationModel = model<ChatConversation>(
  'ChatConversation',
  chatConversationSchema,
);
