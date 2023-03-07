import { getTypeEnum } from '@lib/utils';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema<OrderModel>(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        size: { type: String, required: true },
        imageUri: { type: String },
        quantity: { type: Number, required: true },
        color: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      contactNumber: { type: String },
      primaryAddress: { type: String },
      secondaryAddress: { type: String, required: false },
      zipCode: { type: String },
      city: { type: String },
      country: { type: String },
      state: { type: String, default: '' },
    },
    paymentResult: {
      id: { type: String },
      status: {
        type: String,
        enum: getTypeEnum<PaymentStatus>(),
        default: 'Unpaid',
      },
      email: { type: String },
      required: false,
    },
    paymentMethod: {
      type: String,
      enum: getTypeEnum<PaymentMethod>(),
      default: '',
    },
    appliedCoupon: { type: String, required: false },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: { type: Number, default: 0 },
    wasPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: getTypeEnum<OrderStatus>(),
      default: 'Not Processed',
    },
    discount: { type: Number, default: 0 },
    paidAt: { type: Date, required: false },
    deliveredAt: { type: Date, required: false },
  },
  { timestamps: true },
);

const Order =
  (mongoose.connection.models.Order as mongoose.Model<OrderModel>) ??
  mongoose.model<OrderModel>('Order', orderSchema);

export default Order;
