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
  phone: string;
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
  phone: { type: String, required: true },
  homeNumber: { type: String, required: false, validate: /^(\d{10})?$/ },
  cellNumber: { type: String, required: false, validate: /^(\d{10})?$/ },
  workNumber: { type: String, required: false, validate: /^(\d{10})?$/ },
  conversations: [conversationSchema],
  dateOfBirth: { type: Date, required: false },
  occupation: { type: String, required: false },
  sourceOfLead: { type: String, required: false },
  preferredContactMethod: { type: String, required: false },
  notes: { type: String, required: false },
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
