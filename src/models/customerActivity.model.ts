import mongoose, { Model, Schema } from 'mongoose';
import { ICustomerActivity } from '../utils/index.js';

export interface ICustomerActivityMethods {}

type CustomerActivityTypeModel = Model<ICustomerActivity, {}, ICustomerActivityMethods>;

const customerActivitySchema: Schema<ICustomerActivity, ICustomerActivityMethods> = new Schema<
  ICustomerActivity,
  ICustomerActivityMethods
>(
  {
    customerId: {
      ref: 'Customers',
      type: Schema.Types.ObjectId,
      require: true,
    },
    activityId: {
      ref: 'Activities',
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
customerActivitySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
customerActivitySchema.set('toObject', { transform: true });

//* Configure indexes
customerActivitySchema.index({ name: 1 });
customerActivitySchema.index({ customerId: 1 });
customerActivitySchema.index({ activityId: 1 });

//* Hooks

//* Methods

export const CustomerActivityModel = mongoose.model<ICustomerActivity, CustomerActivityTypeModel>(
  'CustomerActivities',
  customerActivitySchema,
);
