import mongoose from 'mongoose';
import { getTypeEnum } from '@lib/utils';

const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema<ReviewModel>(
  {
    by: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 500,
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 5,
    },
    images: [{ type: String }],
    popularity: [
      {
        likeAmount: {
          type: Number,
          default: 0,
          max: 999,
        },
        dislikeAmount: {
          type: Number,
          default: 0,
          max: 999,
        },
      },
    ],
    pros: [{ type: String }],
    cons: [{ type: String }],
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema<ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: ObjectId,
      required: true,
      ref: 'Category',
    },
    brand: {
      type: String,
      index: 1,
      default: 'Unspecified',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: 1,
    },
    subCategories: [
      {
        type: ObjectId,
        required: false,
        ref: 'SubCategory',
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
    refundPolicy: {
      type: String,
      enum: getTypeEnum<ProductRefundPolicy>(),
      default: '30d',
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
      index: -1,
    },
    reviewCount: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    subProducts: [
      {
        stock: {
          sku: { type: String, required: true },
          quantity: { type: Number, default: 0 },
          price: { type: Number, required: true },
        },
        imageUri: {
          type: String,
          default: 'https://adlog.narmadeayurvedam.com/dtup/default-product.png',
        },
        descriptionImage: {
          type: String,
          required: false,
        },
        color: {
          type: String,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
        amountSold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
);

const Product =
  (mongoose.connection.models.Product as mongoose.Model<ProductModel>) ??
  mongoose.model<ProductModel>('Product', productSchema);

export default Product;
