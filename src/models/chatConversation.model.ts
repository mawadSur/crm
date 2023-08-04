import { Schema, model, Document } from 'mongoose';

interface Message {
  id: string;
  timestamp: Date;
  sender: 'customer' | 'bot';
  message: string;
}

interface ChatConversation extends Document {
  id: string;
  customerId: string;
  messages: Message[];
  createdAt: Date;
}

const messageSchema = new Schema<Message>({
  id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sender: { type: String, enum: ['customer', 'bot'], required: true },
  message: { type: String, required: true },
});

const chatConversationSchema = new Schema<ChatConversation>({
  id: { type: String, required: true },
  customerId: { type: String, required: true },
  messages: [{ type: messageSchema, required: true }],
  createdAt: { type: Date, required: true },
});

const MessageModel = model<Message>('Message', messageSchema);

export const ConversationModel = model<ChatConversation>(
  'ChatConversation',
  chatConversationSchema
);
