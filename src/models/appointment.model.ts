import { Schema, SchemaDefinitionProperty, model } from 'mongoose';
import { Car } from './car.model.js';
import { SalesRep } from './salesRep.model.js';

export interface Appointment {
  id: string;
  time: string;
  name: string;
  car: Car;
  carId: string | SchemaDefinitionProperty<string>;
  isNew: boolean;
  salesRep: SalesRep;
  salesRepId: string | SchemaDefinitionProperty<string>;
}

export const appointmentSchema = new Schema<Appointment>(
  {
    name: { type: String, required: true },
    time: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: 'Car' },
    isNew: { type: Boolean, required: true, default: true },
    salesRepId: { type: Schema.Types.ObjectId, ref: 'SalesRep' },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
appointmentSchema.set('toJSON', {
  transform: function (doc: any, ret) {
    ret.id = doc._id;
    ret.car = doc.carId ? doc.carId : undefined;
    ret.salesRep = doc.salesRepId ? doc.salesRepId : undefined;
    ret.carId = doc?.carId?._id;
    ret.salesRepId = doc?.salesRepId?._id;
    return ret;
  },
});

//* Indexes
appointmentSchema.index({ isNew: 1 });
appointmentSchema.index({ salesRepId: 1 });
appointmentSchema.index({ carId: 1 });
appointmentSchema.index({ name: 1 });
appointmentSchema.index({ time: 1 });

export const AppointmentModel = model<Appointment>('Appointment', appointmentSchema);
