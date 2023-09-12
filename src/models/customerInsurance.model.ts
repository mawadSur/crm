import mongoose, { Model, Schema } from 'mongoose';
import { ICustomerInsurance } from '../utils/index.js';

export interface ICustomerInsuranceMethods {}

type CustomerInsuranceModel = Model<ICustomerInsurance, {}, ICustomerInsuranceMethods>;

const customerInsuranceSchema: Schema<ICustomerInsurance, ICustomerInsuranceMethods> = new Schema<
  ICustomerInsurance,
  ICustomerInsuranceMethods
>(
  {
    policyType: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    policyNumber: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    expiryDate: {
      type: Schema.Types.Date,
      required: true,
    },
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
customerInsuranceSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
customerInsuranceSchema.set('toObject', { transform: true });

//* Configure indexes
customerInsuranceSchema.index({ policyNumber: 1 });
customerInsuranceSchema.index({ policyType: 1 });
customerInsuranceSchema.index({ expiryDate: 1 });
customerInsuranceSchema.index({ customerId: 1 });

//* Hooks

//* Methods

export const CustomerInsuranceModel = mongoose.model<ICustomerInsurance, CustomerInsuranceModel>(
  'CustomerInsurances',
  customerInsuranceSchema,
);
