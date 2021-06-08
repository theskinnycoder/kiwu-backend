import argon2 from 'argon2';
import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import User from '../models/User.model.js';
import connectDB from '../utils/connectDB.js';
import users from './data/users.js';

const importData = async () => {
  await connectDB();
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.insertMany(
      await Promise.all(
        users.map(async (user) => {
          user.password = await argon2.hash(user.password);
          return user;
        }),
      ),
    );

    // const adminUser = createdUsers[0]._id;

    // const sampleProducts = products.map(product => {
    //   return { ...product, user: adminUser };
    // });

    // await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
