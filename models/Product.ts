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
    images: [
      {
        uri: { type: String, required: false },
        publicUri: { type: String, required: false },
      },
    ],
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
    fit: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: true,
    },
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
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    subProducts: [
      {
        sku: { type: String, required: true },
        variants: {
          size: { type: String, required: false },
          quantity: { type: Number, default: 0 },
          price: { type: Number, required: true },
        },
        images: [
          {
            uri: {
              type: String,
              default: 'https://adlog.narmadeayurvedam.com/dtup/default-product.png',
            },
            publicUri: { type: String },
            required: false,
          },
        ],
        descriptionImages: [
          {
            uri: { type: String },
            publicUri: { type: String },
            required: false,
          },
        ],
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
