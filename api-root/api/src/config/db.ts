import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect('');      // Replace with your own
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      process.exit(1);
    } 
    else {
      console.log('Some other error');
    }
  }
};

export default connectDB;