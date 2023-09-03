import { Schema, SchemaDefinitionProperty, model } from 'mongoose';
import { EFinancing, EReferralSource, ESaleStatus, ICustomer } from '../utils/index.js';
import { Car } from './car.model.js';
import { SalesRep } from './salesRep.model.js';

export interface DeskLog {
  id: string;
  customerId: string | SchemaDefinitionProperty<string>;
  customer: ICustomer;
  vehicle: Car;
  vehicleId: string | SchemaDefinitionProperty<string>;
  saleStatus: ESaleStatus;
  tradeIn: string;
  financing: EFinancing;
  timeIn: string;
  timeOut: string;
  referralSource: EReferralSource;
  salesRep: SalesRep;
  salesRepId: string | SchemaDefinitionProperty<string>;
  phoneNumberHome: string;
  phoneNumberCell: string;
  phoneNumberWork: string;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}

export const deskLogSchema = new Schema<DeskLog>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customers' },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Car' },
    saleStatus: { type: String, enum: ESaleStatus, required: true },
    tradeIn: { type: String, required: true },
    financing: { type: String, enum: EFinancing, required: true },
    timeIn: { type: String, required: true },
    timeOut: { type: String, required: true },
    referralSource: { type: String, enum: EReferralSource, required: true },
    salesRepId: { type: Schema.Types.ObjectId, ref: 'SalesRep' },
    phoneNumberHome: { type: String, required: true },
    phoneNumberCell: { type: String, required: true },
    phoneNumberWork: { type: String, required: true },
    comments: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
deskLogSchema.set('toJSON', {
  transform: function (doc: any, ret) {
    ret.id = doc._id;
    ret.vehicle = doc.vehicleId ? doc.vehicleId : undefined;
    ret.salesRep = doc.salesRepId ? doc.salesRepId : undefined;
    ret.vehicleId = doc?.vehicleId?._id;
    ret.salesRepId = doc?.salesRepId?._id;
    ret.customer = doc.customerId ? doc.customerId : undefined;
    ret.customerId = doc?.customerId?._id;
    return ret;
  },
});

//* Indexes
deskLogSchema.index({ customerId: 1 });
deskLogSchema.index({ vehicleId: 1 });
deskLogSchema.index({ saleStatus: 1 });
deskLogSchema.index({ financing: 1 });
deskLogSchema.index({ referralSource: 1 });
deskLogSchema.index({ salesRepId: 1 });

export const DeskLogModel = model<DeskLog>('DeskLogs', deskLogSchema);
