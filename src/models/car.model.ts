import { model, Schema } from 'mongoose';
import { CarModels } from '../core/database/seed/data.seed.js';

const carMakes = CarModels.makeOptions;
const carModels = Object.values(CarModels.modelOptions).flat();
const carYears = CarModels.yearOptions;
const carStatuses = CarModels.statusOptions;

export interface Car {
  make: string;
  model: string;
  year: string;
  VIN: string;
  mileage: number;
  location: string;
  pictures: string[];
  status: string;
  color: string;
  fuelType: string;
  costPrice: number;
  salePrice: number;
  options: string[];
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
  color: { type: String, required: true },
  fuelType: { type: String, required: true },
  costPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  options: { type: [String], required: false },
});

//* Indexes
carSchema.index({ make: 1 });
carSchema.index({ model: 1 });
carSchema.index({ year: 1 });
carSchema.index({ VIN: 1 });
carSchema.index({ mileage: 1 });
carSchema.index({ location: 1 });
carSchema.index({ status: 1 });
carSchema.index({ color: 1 });
carSchema.index({ fuelType: 1 });
carSchema.index({ costPrice: 1 });
carSchema.index({ salePrice: 1 });

export const CarModel = model<Car>('Car', carSchema);
