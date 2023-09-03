import { model, Schema } from 'mongoose';
import { ageRange, ECustomerGender, ICustomer, validateEmailRegex } from '../utils/index.js';

export interface TextConversation {
  timestamp: Date;
  sender: string;
  message: string;
}

export const otherContactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: validateEmailRegex,
  },
});

export const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    age: { type: Number, enum: ageRange, required: true },
    gender: { type: String, enum: ECustomerGender, required: true },
    address: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: validateEmailRegex,
    },
    homeNumber: { type: String, required: true, validate: /^\d{10}$/ },
    cellNumber: { type: String, required: true, validate: /^\d{10}$/ },
    workNumber: { type: String, required: true, validate: /^\d{10}$/ },
    dateOfBirth: { type: Date, required: true },
    occupation: { type: String, required: true },
    sourceOfLead: { type: String, required: true },
    preferredContactMethod: { type: String, required: true },
    notes: { type: String, required: true },
    otherContacts: {
      type: [otherContactSchema],
      default: [],
    },
    relationships: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Customers',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

//* Indexes
customerSchema.index({ name: 1 });
customerSchema.index({ age: 1 });
customerSchema.index({ gender: 1 });
customerSchema.index({ homeNumber: 1 });
customerSchema.index({ cellNumber: 1 });
customerSchema.index({ workNumber: 1 });
customerSchema.index({ email: 1 });

customerSchema.index({ 'otherContacts.name': 1 });
customerSchema.index({ 'otherContacts.phone': 1 });
customerSchema.index({ 'otherContacts.email': 1 });

export const CustomerModel = model<ICustomer>('Customers', customerSchema);
