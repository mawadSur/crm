import mongoose, { Model, Schema } from 'mongoose';
import { ECustomerServiceType, ICustomerService } from '../utils/index.js';

export interface ICustomerServiceMethods {}

type CustomerServiceTypeModel = Model<ICustomerService, {}, ICustomerServiceMethods>;

const customerServiceSchema: Schema<ICustomerService, ICustomerServiceMethods> = new Schema<
  ICustomerService,
  ICustomerServiceMethods
>(
  {
    serviceTypeId: {
      ref: 'ServiceTypes',
      type: Schema.Types.ObjectId,
      require: true,
    },
    customerId: {
      ref: 'Customers',
      type: Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: String,
      enum: [
        ECustomerServiceType.Completed,
        ECustomerServiceType.InProgress,
        ECustomerServiceType.Pending,
      ],
      default: ECustomerServiceType.Pending,
    },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
customerServiceSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
customerServiceSchema.set('toObject', { transform: true });

//* Configure indexes
customerServiceSchema.index({ status: 1 });
customerServiceSchema.index({ customerId: 1 });

//* Hooks

//* Methods

export const CustomerServiceModel = mongoose.model<ICustomerService, CustomerServiceTypeModel>(
  'CustomerServices',
  customerServiceSchema,
);
