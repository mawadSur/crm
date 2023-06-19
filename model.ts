import { FormatString, model, Schema } from 'mongoose';
import fs from 'fs';

const ageRange: number[] = Array.from({ length: 83 }, (_, index) => index + 18);

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

export const SalesRepSchema = new Schema<SalesRep>({
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

export const SalesRepModel = model<SalesRep>('Sales Rep', SalesRepSchema);

export interface Customer {
  name: string;
  age: number;
  gender: string;
  address: string;
  email: string;
  phone: FormatString;
  conversations: TextConversation[]; // Add conversations field
  dateOfBirth: Date;
  occupation: string;
  sourceOfLead: string;
  preferredContactMethod: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TextConversation {
  timestamp: Date;
  sender: string;
  message: string;
}

export const CustomerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  age: { type: Number, enum: ageRange, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, validate: /^\d{10}$/ },
  conversations: [{ // Define conversations sub-schema
    timestamp: { type: Date, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
  }],
  dateOfBirth: { type: Date, required: true },
  occupation: { type: String, required: true },
  sourceOfLead: { type: String, required: true },
  preferredContactMethod: { type: String, required: true },
  notes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const CustomerModel = model<Customer>('Customers', CustomerSchema);


const jsonFileContent = fs.readFileSync('cars.json', 'utf8');
const dropdownOptions = JSON.parse(jsonFileContent);

const carMakes = dropdownOptions.makeOptions;
const carModels = Object.values(dropdownOptions.modelOptions).flat();
const carYears = dropdownOptions.yearOptions;
const carStatuses = dropdownOptions.statusOptions;

export interface Car {
  make: string;
  model: string;
  year: string;
  VIN: string;
  mileage: number;
  location: string;
  pictures: string[];
  status: string;
}

export const CarSchema = new Schema<Car>({
  make: { type: String, enum: carMakes, required: true },
  model: { type: String, enum: carModels.map(String), required: true },
  year: { type: String, enum: carYears, required: true },
  VIN: { type: String, required: true },
  mileage: { type: Number, required: true },
  location: { type: String, required: true },
  pictures: { type: [String], required: true },
  status: { type: String, enum: carStatuses, required: true },
});

export const CarModel = model<Car>('Car', CarSchema);