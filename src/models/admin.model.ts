import bcrypt from 'bcryptjs';
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdminUser extends Document {
  email: string;
  password: string;
}

export interface IAdminMethods {
  comparePassword(password: string): Promise<boolean>;
}

type AdminUserModel = Model<IAdminUser, {}, IAdminMethods>;

const adminSchema: Schema<IAdminUser, IAdminMethods> = new Schema<IAdminUser, IAdminMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 256,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          return /[a-zA-Z]+/.test(value) && /\d+/.test(value);
        },
        message: 'Password must contain both letters and numbers',
      },
    },
  },
  {
    timestamps: true,
  }
);

//* Configure the 'toJSON' and 'toObject' options
adminSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    ret.id = doc._id;
    return ret;
  },
});
adminSchema.set('toObject', { transform: true });

//* Configure indexes
adminSchema.index({ email: 1 });

//* Hooks
adminSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//* Methods
adminSchema.method('comparePassword', async function comparePassword(password: string) {
  return await bcrypt.compare(password, this.password);
});

export const AdminUser = mongoose.model<IAdminUser, AdminUserModel>('Admin', adminSchema);
