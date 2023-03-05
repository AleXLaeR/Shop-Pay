import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema<CouponModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
      minlength: 4,
      maxlength: 20,
    },
    actualDiscount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Coupon =
  (mongoose.connection.models.Coupon as mongoose.Model<CouponModel>) ??
  mongoose.model<CouponModel>('Coupon', couponSchema);

export default Coupon;
