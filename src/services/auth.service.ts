import { AdminUser } from '../models/admin.model.js';

export const adminAuthenticate = async (email: string, password: string) => {
  const admin = await AdminUser.findOne({ email }).exec();

  if (admin && (await admin.comparePassword(password))) {
    return admin.toJSON();
  }

  return null; // Return null if authentication fails
};
