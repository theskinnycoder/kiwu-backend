import mongoose from "mongoose"
import { MONGO_URI } from "./constants.js"

// -- Async function that connects to MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    console.log(
      `Connected to the ${conn.connection.name} MongoDB DataBase...`.cyan
        .underline
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
