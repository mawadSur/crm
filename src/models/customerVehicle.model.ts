import mongoose, { Model, Schema } from 'mongoose';
import { ICustomerVehicle, carMakes, carModels, carYears } from '../utils/index.js';

export interface ICustomerVehicleMethods {}

type CustomerVehicleModel = Model<ICustomerVehicle, {}, ICustomerVehicleMethods>;

const customerVehicleSchema: Schema<ICustomerVehicle, ICustomerVehicleMethods> = new Schema<
  ICustomerVehicle,
  ICustomerVehicleMethods
>(
  {
    make: { type: String, enum: carMakes, required: true },
    model: { type: String, enum: carModels.map(String), required: true },
    year: { type: String, enum: carYears, required: true },
    equity: { type: String, required: true },
    customerId: {
      ref: 'Customers',
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
customerVehicleSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
customerVehicleSchema.set('toObject', { transform: true });

//* Configure indexes
customerVehicleSchema.index({ make: 1 });
customerVehicleSchema.index({ model: 1 });
customerVehicleSchema.index({ year: 1 });
customerVehicleSchema.index({ equity: 1 });
customerVehicleSchema.index({ customerId: 1 });

//* Hooks

//* Methods

export const CustomerVehicleModel = mongoose.model<ICustomerVehicle, CustomerVehicleModel>(
  'CustomerVehicles',
  customerVehicleSchema,
);
