import { Document } from 'mongoose';

export interface IServiceType extends Document {
  name: string;
  // status: EServiceTypeStatus;
}
