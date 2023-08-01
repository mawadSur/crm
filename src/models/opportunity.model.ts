import { FormatString, model, Schema } from 'mongoose';
import { ageRange } from '../utils/index.js';

export interface Opportunity {
  vehicle: string;
  stock: string;
  trade: boolean;
  salesTeam: string;
  upType: string;
  source: string;
  dateTimeDue: Date;
  salesStatus: string;
  inShowroom: boolean;
  demo: boolean;
  askMoneyDown: boolean;
  writeUp: boolean;
  to: boolean;
  managerPhoneCall: boolean;
}

export const opportunitySchema = new Schema<Opportunity>({
  vehicle: { type: String, required: true },
  stock: { type: String, required: true },
  trade: { type: Boolean, required: true },
  salesTeam: { type: String, required: true },
  upType: { type: String, required: true },
  source: { type: String, required: true },
  dateTimeDue: { type: Date, required: true },
  salesStatus: { type: String, required: true },
  inShowroom: { type: Boolean, required: true },
  demo: { type: Boolean, required: true },
  askMoneyDown: { type: Boolean, required: true },
  writeUp: { type: Boolean, required: true },
  to: { type: Boolean, required: true },
  managerPhoneCall: { type: Boolean, required: true },
});

//* Indexes
opportunitySchema.index({ employeeId: 1 });
opportunitySchema.index({ isActive: 1 });
opportunitySchema.index({ gender: 1 });
opportunitySchema.index({ phone: 1 });
opportunitySchema.index({ name: 1 });
opportunitySchema.index({ age: 1 });

export const OpportunityModel = model<Opportunity>('Opportunity', opportunitySchema);
