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
    // if (!salesVolumes) return;

    for await (const salesVolume of salesVolumeData) {
      const newSalesVolume = new SalesVolumeModel({
        name: salesVolume.name,
        NewCars: salesVolume.NewCars,
        UsedCars: salesVolume.UsedCars,
      });
      await newSalesVolume.save();
    }

    // const desklogs = await DeskLogModel.find().lean().exec();
    // if (desklogs.length > 0) return;

    // for await (const desklog of deskLogData) {
    //   const [car, saleRep, customer] = await Promise.all([
    //     CarModel.findOne().lean().exec(),
    //     SalesRepModel.findOne().exec(),
    //     CustomerModel.findOne().lean().exec(),
    //   ]);

    //   if (car && saleRep && customer) {
    //     const newDeskLog = new DeskLogModel({
    //       vehicleId: car._id,
    //       salesRepId: saleRep._id,
    //       customerId: customer._id,
    //       saleStatus: desklog.saleStatus,
    //       tradeIn: desklog.tradeIn,
    //       financing: desklog.financing,
    //       timeIn: new Date().toISOString(),
    //       timeOut: new Date().toISOString(),
    //       referralSource: desklog.referralSource,
    //       comments: desklog.comments,
    //       phoneNumberHome: desklog.phoneNumberHome,
    //       phoneNumberCell: desklog.phoneNumberCell,
    //       phoneNumberWork: desklog.phoneNumberWork,
    //     });
    //     await newDeskLog.save();
    //   }
    // }

    console.timeEnd('✏️ [SEEDING] sales volumes');
  } catch (error) {
    console.log('error', error);
    console.log('💥 [SEEDING] sales volume error', error.message);
  }
};

const deskLogData = [
  {
    id: 1,
    customerName: 'John Doe',
    vehicle: 'Toyota Camry',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '9:00 AM',
    timeOut: '5:00 PM',
    referralSource: 'Internet',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Interested in the latest model.',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    vehicle: 'Honda Civic',
    saleStatus: 'Completed',
    tradeIn: '2009 Ford Focus',
    financing: 'Approved',
    timeIn: '10:30 AM',
    timeOut: '6:30 PM',
    referralSource: 'Phone',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Happy with the deal.',
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    vehicle: 'Ford Mustang',
    saleStatus: 'Lost',
    tradeIn: '2015 Chevrolet Corvette',
    financing: 'Declined',
    timeIn: '11:15 AM',
    timeOut: '4:45 PM',
    referralSource: 'Campaign',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Considering other options.',
  },
  {
    id: 4,
    customerName: 'Alice Williams',
    vehicle: 'BMW X5',
    saleStatus: 'In Progress',
    tradeIn: '2018 Audi Q7',
    financing: 'Pending',
    timeIn: '2:00 PM',
    timeOut: '7:30 PM',
    referralSource: 'Internet',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Needs time to decide.',
  },
  {
    id: 5,
    customerName: 'Charlie Brown',
    vehicle: 'Audi Q5',
    saleStatus: 'Completed',
    tradeIn: '2014 BMW 3 Series',
    financing: 'Approved',
    timeIn: '12:45 PM',
    timeOut: '6:15 PM',
    referralSource: 'Phone',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Loves the test drive.',
  },
  {
    id: 26,
    customerName: 'Olivia Wilson',
    vehicle: 'Nissan Rogue',
    saleStatus: 'In Progress',
    tradeIn: '2016 Honda CR-V',
    financing: 'Pending',
    timeIn: '9:30 AM',
    timeOut: '4:30 PM',
    referralSource: 'Internet',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Needs to discuss with spouse.',
  },
  {
    id: 27,
    customerName: 'Lucas Lee',
    vehicle: 'Kia Seltos',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '10:00 AM',
    timeOut: '6:00 PM',
    referralSource: 'Campaign',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Interested in the latest model.',
  },
  {
    id: 28,
    customerName: 'Ava Robinson',
    vehicle: 'Hyundai Sonata',
    saleStatus: 'In Progress',
    tradeIn: '2012 Toyota Corolla',
    financing: 'Pending',
    timeIn: '11:30 AM',
    timeOut: '5:30 PM',
    referralSource: 'Phone',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Wants to compare prices.',
  },
  {
    id: 29,
    customerName: 'Emma Hall',
    vehicle: 'Chevrolet Equinox',
    saleStatus: 'Completed',
    tradeIn: '2010 Ford Escape',
    financing: 'Approved',
    timeIn: '1:00 PM',
    timeOut: '7:00 PM',
    referralSource: 'Internet',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Excited about the deal.',
  },
  {
    id: 30,
    customerName: 'William Baker',
    vehicle: 'Volkswagen Tiguan',
    saleStatus: 'Lost',
    tradeIn: 'None',
    financing: 'Declined',
    timeIn: '3:30 PM',
    timeOut: '8:30 PM',
    referralSource: 'Service',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Considering other options.',
  },
  {
    id: 31,
    customerName: 'Sophia Lee',
    vehicle: 'Mazda CX-5',
    saleStatus: 'In Progress',
    tradeIn: '2014 Hyundai Santa Fe',
    financing: 'Pending',
    timeIn: '9:45 AM',
    timeOut: '5:15 PM',
    referralSource: 'Phone',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Needs to discuss with spouse.',
  },
  {
    id: 32,
    customerName: 'Oliver Davis',
    vehicle: 'Subaru Outback',
    saleStatus: 'Completed',
    tradeIn: '2013 Toyota RAV4',
    financing: 'Approved',
    timeIn: '10:15 AM',
    timeOut: '6:45 PM',
    referralSource: 'Internet',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Happy with the deal.',
  },
  {
    id: 33,
    customerName: 'Aria Scott',
    vehicle: 'Jeep Grand Cherokee',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '11:45 AM',
    timeOut: '4:15 PM',
    referralSource: 'Campaign',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Considering other options.',
  },
  {
    id: 34,
    customerName: 'Ethan Turner',
    vehicle: 'Ford Explorer',
    saleStatus: 'In Progress',
    tradeIn: '2017 Chevrolet Traverse',
    financing: 'Pending',
    timeIn: '12:30 PM',
    timeOut: '5:30 PM',
    referralSource: 'Service',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Needs to discuss with family.',
  },
  {
    id: 35,
    customerName: 'Amelia Martin',
    vehicle: 'Kia Telluride',
    saleStatus: 'Completed',
    tradeIn: '2016 Nissan Pathfinder',
    financing: 'Approved',
    timeIn: '2:15 PM',
    timeOut: '7:45 PM',
    referralSource: 'Phone',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Loves the features.',
  },

  {
    id: 31,
    customerName: 'Sophia Lee',
    vehicle: 'Mazda CX-5',
    saleStatus: 'In Progress',
    tradeIn: '2014 Hyundai Santa Fe',
    financing: 'Pending',
    timeIn: '9:45 AM',
    timeOut: '5:15 PM',
    referralSource: 'Phone',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Needs to discuss with spouse.',
  },
  {
    id: 32,
    customerName: 'Oliver Davis',
    vehicle: 'Subaru Outback',
    saleStatus: 'Completed',
    tradeIn: '2013 Toyota RAV4',
    financing: 'Approved',
    timeIn: '10:15 AM',
    timeOut: '6:45 PM',
    referralSource: 'Internet',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Happy with the deal.',
  },
  {
    id: 33,
    customerName: 'Aria Scott',
    vehicle: 'Jeep Grand Cherokee',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '11:45 AM',
    timeOut: '4:15 PM',
    referralSource: 'Campaign',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Considering other options.',
  },
  {
    id: 34,
    customerName: 'Ethan Turner',
    vehicle: 'Ford Explorer',
    saleStatus: 'In Progress',
    tradeIn: '2017 Chevrolet Traverse',
    financing: 'Pending',
    timeIn: '12:30 PM',
    timeOut: '5:30 PM',
    referralSource: 'Service',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Needs to discuss with family.',
  },
  {
    id: 35,
    customerName: 'Amelia Martin',
    vehicle: 'Kia Telluride',
    saleStatus: 'Completed',
    tradeIn: '2016 Nissan Pathfinder',
    financing: 'Approved',
    timeIn: '2:15 PM',
    timeOut: '7:45 PM',
    referralSource: 'Phone',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Loves the features.',
  },
];
