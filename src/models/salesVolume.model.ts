import { model, Schema } from 'mongoose';

export interface SalesVolume {
  name: string;
  newCars: number;
  usedCars: number;
}

export const salesVolumeSchema = new Schema<SalesVolume>({
  name: { type: String, required: true },
  newCars: { type: Number, required: true },
  usedCars: { type: Number, required: true },
});

//* Indexes
salesVolumeSchema.index({ name: 1 });
salesVolumeSchema.index({ newCars: 1 });
salesVolumeSchema.index({ usedCars: 1 });

export const SalesVolumeModel = model<SalesVolume>('SalesVolume', salesVolumeSchema);
