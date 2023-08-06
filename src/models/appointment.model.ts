import { Schema, model } from 'mongoose';
import { SalesRep } from './salesRep.model.js';
import { SchemaDefinitionProperty } from 'mongoose';
import { Car } from './car.model.js';

export interface Appointment {
  id: string;
  time: string;
  name: string;
  car: Car;
  carId: string | SchemaDefinitionProperty<string>;
  isNew: boolean;
  salesRep: SalesRep;
  saleRepId: string | SchemaDefinitionProperty<string>;
}

export const appointmentSchema = new Schema<Appointment>(
  {
    name: { type: String, required: true },
    time: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: 'Car' },
    isNew: { type: Boolean, required: true },
    saleRepId: { type: Schema.Types.ObjectId, ref: 'SalesRep' },
  },
  {
    timestamps: true,
  }
);

//* Configure the 'toJSON' and 'toObject' options
appointmentSchema.set('toJSON', {
  transform: function (doc: any, ret) {
    ret.id = doc._id;
    ret.car = doc.carId ? doc.carId : undefined;
    ret.salesRep = doc.saleRepId ? doc.saleRepId : undefined;
    ret.carId = doc?.carId?._id;
    ret.saleRepId = doc?.saleRepId?._id;
    return ret;
  },
});

// Define a virtual for renaming the carId field
appointmentSchema.virtual('car').get(function () {
  return this.carId ? this.carId : undefined;
});

// Define a virtual for renaming the saleRepId field
appointmentSchema.virtual('salesRep').get(function () {
  return this.saleRepId ? this.saleRepId : undefined;
});

//* Indexes
appointmentSchema.index({ isNew: 1 });
appointmentSchema.index({ saleRepId: 1 });
appointmentSchema.index({ carId: 1 });
appointmentSchema.index({ name: 1 });
appointmentSchema.index({ time: 1 });

export const AppointmentModel = model<Appointment>('Appointment', appointmentSchema);
