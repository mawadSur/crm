import { CarModels } from '../../core/database/seed/data.seed.js';

export const carMakes = CarModels.makeOptions;
export const carModels = Object.values(CarModels.modelOptions).flat();
export const carYears = CarModels.yearOptions;
export const carStatuses = CarModels.statusOptions;
