import { FormatString, model, Schema } from 'mongoose';
import { ageRange } from '../utils/index.js';

export enum ECustomerGender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
export interface Customer {
  name: string;
  age: number;
  gender: ECustomerGender;
  address: string;
  email: string;
  otherEmail: string;
  homeNumber: FormatString;
  cellNumber: FormatString;
  workNumber: FormatString;
  conversations: TextConversation[]; // Add conversations field
  dateOfBirth: Date;
  occupation: string;
  sourceOfLead: string;
  preferredContactMethod: string;
  notes: string;
  textPreferred: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface TextConversation {
  timestamp: Date;
  sender: string;
  message: string;
}

export const conversationSchema = new Schema({
  timestamp: { type: Date, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
});

export const customerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  age: { type: Number, enum: ageRange, required: true },
  gender: { type: String, enum: ECustomerGender, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  homeNumber: { type: String, required: true, validate: /^\d{10}$/ },
  cellNumber: { type: String, required: true, validate: /^\d{10}$/ },
  workNumber: { type: String, required: true, validate: /^\d{10}$/ },
  conversations: [conversationSchema],
  dateOfBirth: { type: Date, required: true },
  occupation: { type: String, required: true },
  sourceOfLead: { type: String, required: true },
  preferredContactMethod: { type: String, required: true },
  notes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//* Indexes
customerSchema.index({ name: 1 });
customerSchema.index({ age: 1 });
customerSchema.index({ gender: 1 });
customerSchema.index({ phone: 1 });
customerSchema.index({ email: 1 });

export const CustomerModel = model<Customer>('Customers', customerSchema);
