import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the category'],
    },
  },
  {
    timestamps: false,
  },
);

const Category = model('Category', categorySchema);

export default Category;
