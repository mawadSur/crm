import {
  SalesVolumeModel,
  AppointmentModel,
  CarModel,
  CustomerModel,
  DeskLogModel,
  SalesRepModel,
} from '../../../models/index.js';

export const salesVolumeData = [
  {
    name: 'July 1',
    NewCars: 55,
    UsedCars: 60,
  },
  {
    name: 'July 2',
    NewCars: 58,
    UsedCars: 65,
  },
  {
    name: 'July 3',
    NewCars: 20,
    UsedCars: 25,
  },
  {
    name: 'July 4',
    NewCars: 22,
    UsedCars: 28,
  },
  {
    name: 'July 5',
    NewCars: 18,
    UsedCars: 30,
  },
  {
    name: 'July 6',
    NewCars: 15,
    UsedCars: 20,
  },
  {
    name: 'July 7',
    NewCars: 25,
    UsedCars: 30,
  },
  {
    name: 'July 8',
    NewCars: 50,
    UsedCars: 55,
  },
  {
    name: 'July 9',
    NewCars: 60,
    UsedCars: 58,
  },
  {
    name: 'July 10',
    NewCars: 17,
    UsedCars: 18,
  },
  {
    name: 'July 11',
    NewCars: 20,
    UsedCars: 24,
  },
  {
    name: 'July 12',
    NewCars: 16,
    UsedCars: 22,
  },
  {
    name: 'July 13',
    NewCars: 22,
    UsedCars: 30,
  },
  {
    name: 'July 14',
    NewCars: 26,
    UsedCars: 30,
  },
  {
    name: 'July 15',
    NewCars: 55,
    UsedCars: 60,
  },
  {
    name: 'July 16',
    NewCars: 60,
    UsedCars: 65,
  },
  {
    name: 'July 17',
    NewCars: 23,
    UsedCars: 30,
  },
  {
    name: 'July 18',
    NewCars: 25,
    UsedCars: 35,
  },
  {
    name: 'July 19',
    NewCars: 22,
    UsedCars: 28,
  },
  {
    name: 'July 20',
    NewCars: 18,
    UsedCars: 20,
  },
  {
    name: 'July 21',
    NewCars: 20,
    UsedCars: 26,
  },
  {
    name: 'July 22',
    NewCars: 58,
    UsedCars: 60,
  },
  {
    name: 'July 23',
    NewCars: 60,
    UsedCars: 70,
  },
  {
    name: 'July 24',
    NewCars: 24,
    UsedCars: 30,
  },
];
export const seedSalesVolume = async () => {
  try {
    console.time('✏️ [SEEDING] sales volume');

    const salesVolumes = await SalesVolumeModel.find().lean().exec();
    for await (const salesVolume of salesVolumeData) {
      const newSalesVolume = new SalesVolumeModel({
        name: salesVolume.name,
        newCars: salesVolume.NewCars,
        usedCars: salesVolume.UsedCars,
      });
      await newSalesVolume.save();
    }
    console.timeEnd('✏️ [SEEDING] sales volumes');
  } catch (error) {
    console.log('error', error);
    console.log('💥 [SEEDING] sales volume error', error.message);
  }
};
