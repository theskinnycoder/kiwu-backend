import { model, Schema } from 'mongoose';

const arrayNotEmpty = (arr) => arr.length >= 1;

const productSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for your product'],
    },
    description: {
      type: String,
      minlength: [20, 'Description too short. Make it longer than 20 characters'],
      required: [true, 'Please provide some description for your product'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image for your product'],
    },
    designer: {
      type: String,
      required: [true, "Please provide the product's designer's name"],
    },
    category: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
      required: false,
      validate: [arrayNotEmpty, 'Select atleast one category type'],
    },
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please provide the price of the product'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Product = model('Product', productSchema);

export default Product;
