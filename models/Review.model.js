import { model, Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true, min: 0, max: 5, default: 5 },
    title: { type: String, required: false },
    body: { type: String, required: false },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  },
);

const Review = model('Review', reviewSchema);

export default Review;
