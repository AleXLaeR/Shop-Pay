import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema<CartModel>(
  {
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
    subTotal: { type: Number, required: true },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    wasCouponApplied: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Cart =
  (mongoose.connection.models.Cart as mongoose.Model<CartModel>) ??
  mongoose.model<CartModel>('Cart', cartSchema);

export default Cart;
