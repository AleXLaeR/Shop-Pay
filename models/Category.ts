import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema<CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: [6, 'Category name is not descriptive enough'],
      maxlength: [32, 'Category name is too long'],
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
        name: {
          type: String,
          required: true,
          minlength: [6, 'Category name is not descriptive enough'],
          maxlength: [32, 'Category name is too long'],
        },
        slug: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          index: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

const Category =
  (mongoose.connection.models.Category as mongoose.Model<CategoryModel>) ??
  mongoose.model<CategoryModel>('Category', categorySchema);

export default Category;
