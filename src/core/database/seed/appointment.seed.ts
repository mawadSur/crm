import { AppointmentModel, CarModel, SalesRepModel } from '../../../models/index.js';

export const seedAppointment = async () => {
  try {
    console.time('✏️ [SEEDING] example appointments');

    for await (const name of [
      'Mason Martin',
      'Sophia King',
      'Ava White',
      'Lucas Thompson',
      'Noah Davis',
    ]) {
      const appointment = await AppointmentModel.findOne({
        name,
      })
        .lean()
        .exec();
      if (appointment) continue;

      const [car, saleRep] = await Promise.all([
        CarModel.findOne().lean().exec(),
        SalesRepModel.findOne().exec(),
      ]);

      if (car && saleRep) {
        const newAppointment = new AppointmentModel({
          carId: car._id,
          salesRepId: saleRep._id,
          time: new Date().toISOString(),
          isNew: true,
          name: name,
        });
        await newAppointment.save();
      }
    }
    console.timeEnd('✏️ [SEEDING] example appointments');
  } catch (error) {
    console.log('error', error);
    console.log('💥 [SEEDING] appointments error', error.message);
  }
};
