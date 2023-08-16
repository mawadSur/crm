import { Schema, SchemaDefinitionProperty, model } from 'mongoose';

export interface Blast {
  id: string;
  name: string;
  phone: string;
  customerId: string | SchemaDefinitionProperty<string>;
  isSendMessage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const blastSchema = new Schema<Blast>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customers' },
    isSendMessage: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
blastSchema.set('toJSON', {
  transform: function (doc: any, ret) {
    ret.id = doc._id;
    return ret;
  },
});

//* Indexes
blastSchema.index({ customerId: 1 });
blastSchema.index({ name: 1 });
blastSchema.index({ phone: 1 });
blastSchema.index({ isSendMessage: 1 });

export const BlastModel = model<Blast>('Blast', blastSchema);
