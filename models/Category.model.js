import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the category"],
    },
  },
  {
    timestamps: false,
  },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
