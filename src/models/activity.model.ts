import mongoose, { Model, Schema } from 'mongoose';
import { IServiceType } from '../utils/index.js';

export interface IActivityMethods {}

type ActivityTypeModel = Model<IServiceType, {}, IActivityMethods>;

const activitySchema: Schema<IServiceType, IActivityMethods> = new Schema<
  IServiceType,
  IActivityMethods
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
activitySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
activitySchema.set('toObject', { transform: true });

//* Configure indexes
activitySchema.index({ name: 1 });

//* Hooks

//* Methods

export const ActivityModel = mongoose.model<IServiceType, ActivityTypeModel>(
  'Activities',
  activitySchema,
);
