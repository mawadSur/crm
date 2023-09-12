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
    phone: { type: String, required: false, validate: /^(\d{10})?$/ },
    homeNumber: { type: String, required: false, validate: /^(\d{10})?$/ },
    cellNumber: { type: String, required: false, validate: /^(\d{10})?$/ },
    workNumber: { type: String, required: false, validate: /^(\d{10})?$/ },
    dateOfBirth: { type: Date, required: false },
    occupation: { type: String, required: false },
    sourceOfLead: { type: String, required: false },
    preferredContactMethod: { type: String, required: false },
    notes: { type: String, required: false },
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
customerSchema.index({ relationships: 1 });
customerSchema.index({ 'otherContacts.name': 1 });
customerSchema.index({ 'otherContacts.phone': 1 });
customerSchema.index({ 'otherContacts.email': 1 });

export const CustomerModel = model<ICustomer>('Customers', customerSchema);
