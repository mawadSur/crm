import mongoose, { Model, Schema } from 'mongoose';
import { IServiceType } from '../utils/index.js';

export interface IServiceTypeMethods {}

type ServiceTypeModel = Model<IServiceType, {}, IServiceTypeMethods>;

const serviceTypeSchema: Schema<IServiceType, IServiceTypeMethods> = new Schema<
  IServiceType,
  IServiceTypeMethods
>(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 256,
    },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
serviceTypeSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
serviceTypeSchema.set('toObject', { transform: true });

//* Configure indexes
serviceTypeSchema.index({ name: 1 });

//* Hooks

//* Methods

export const ServiceType = mongoose.model<IServiceType, ServiceTypeModel>(
  'ServiceTypes',
  serviceTypeSchema,
);
