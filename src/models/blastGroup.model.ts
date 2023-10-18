import { Schema, SchemaDefinitionProperty, model } from 'mongoose';
import { Blast } from './blast.model.js';

export interface BlastGroup {
  id: string;
  blastIds: Array<string | SchemaDefinitionProperty<string>>;
  blasts?: Array<Blast>;
  createdAt: Date;
  updatedAt: Date;
}

export const blastGroupSchema = new Schema<BlastGroup>(
  {
    blastIds: [{ type: Schema.Types.ObjectId, ref: 'Blast' }],
  },
  {
    timestamps: true,
  },
);

//* Configure the 'toJSON' and 'toObject' options
blastGroupSchema.set('toJSON', {
  transform: function (doc: any, ret) {
    ret.id = doc._id;
    return ret;
  },
});

//* Indexes
blastGroupSchema.index({ blastIds: 1 });
blastGroupSchema.index({ createdAt: 1 });

export const BlastGroupModel = model<BlastGroup>('BlastGroup', blastGroupSchema);
