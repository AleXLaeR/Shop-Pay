import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const subCategorySchema = new mongoose.Schema<SubCategoryModel>(
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
    /* parent: {
      type: ObjectId,
      required: true,
      ref: 'Category',
    },
     */
  },
  { timestamps: true },
);

const SubCategory =
  (mongoose.connection.models.SubCategory as mongoose.Model<SubCategoryModel>) ??
  mongoose.model<SubCategoryModel>('SubCategory', subCategorySchema);

export default SubCategory;
