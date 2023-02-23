import { getTypeEnum } from '@lib/utils';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your full name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your E-Mail address'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    role: {
      type: String,
      enum: getTypeEnum<UserRole>(),
      default: 'buyer',
    },
    image: {
      type: String,
      default: 'https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      enum: getTypeEnum<PaymentMethod>(),
      default: '',
    },
    addresses: [
      {
        firstName: { type: String },
        lastName: { type: String },
        contactNumber: { type: String },
        primaryAddress: { type: String },
        secondaryAddress: { type: String, required: false },
        zipCode: { type: String },
        city: { type: String },
        country: { type: String },
        state: { type: String, default: '' },
        wasUsedBefore: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

const User =
  (mongoose.connection.models.User as mongoose.Model<UserModel>) ??
  mongoose.model<UserModel>('User', userSchema);

export default User;
