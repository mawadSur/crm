import { FormatString, model, Schema } from 'mongoose';
import { ageRange } from '../utils/index.js';

export interface SalesRep {
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: FormatString;
  employeeId: string;
  department: string;
  supervisor: string;
  hireDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const salesRepSchema = new Schema<SalesRep>({
  name: { type: String, required: true },
  age: { type: Number, enum: ageRange, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, validate: /^\d{10}$/ },
  employeeId: { type: String, required: true },
  department: { type: String, required: true },
  supervisor: { type: String, required: true },
  hireDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//* Indexes
salesRepSchema.index({ employeeId: 1 });
salesRepSchema.index({ isActive: 1 });
salesRepSchema.index({ gender: 1 });
salesRepSchema.index({ phone: 1 });
salesRepSchema.index({ name: 1 });
salesRepSchema.index({ age: 1 });

export const SalesRepModel = model<SalesRep>('SalesRep', salesRepSchema);
