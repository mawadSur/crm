import fs from 'fs';
import { model, Schema } from 'mongoose';

const jsonFileContent = fs.readFileSync('./cars.json', 'utf8');
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

export const carSchema = new Schema<Car>({
  make: { type: String, enum: carMakes, required: true },
  model: { type: String, enum: carModels.map(String), required: true },
  year: { type: String, enum: carYears, required: true },
  VIN: { type: String, required: true },
  mileage: { type: Number, required: true },
  location: { type: String, required: true },
  pictures: { type: [String], required: true },
  status: { type: String, enum: carStatuses, required: true },
});

//* Indexes
carSchema.index({ make: 1 });
carSchema.index({ model: 1 });
carSchema.index({ year: 1 });
carSchema.index({ VIN: 1 });
carSchema.index({ mileage: 1 });
carSchema.index({ location: 1 });
carSchema.index({ status: 1 });

export const CarModel = model<Car>('Car', carSchema);
