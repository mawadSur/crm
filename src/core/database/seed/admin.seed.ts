import { AdminUser } from '../../../models/admin.model.js';

export const admins = [
  {
    email: 'admin@crm.com',
    password: process.env.ADMIN_PASSWORD,
  },
];

export const seedAdmin = async () => {
  try {
    console.time('✏️ [SEEDING] admin');
    for await (const admin of admins) {
      const _admin = await AdminUser.findOne({ email: admin.email }).lean().exec();
      if (!_admin) {
        const newAdmin = new AdminUser();
        newAdmin.email = admin.email;
        newAdmin.password = admin.password as string;
        await newAdmin.save();
      }
    }
    console.timeEnd('✏️ [SEEDING] admin');
  } catch (error) {
    console.log('💥 [SEEDING] admin error', error.message);
  }
};
