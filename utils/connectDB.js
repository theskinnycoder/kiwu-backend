import { connect } from 'mongoose';
import { MONGO_URI } from './constants';

// -- Async function that connects to MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await connect(MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to the ${conn.connection.name} MongoDB DataBase...`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
