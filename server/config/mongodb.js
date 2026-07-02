import mongoose from "mongoose";

const connectDB = async() => {
  // Step 1 : Register an event listener BEFORE connecting
  // This fires a console log whenever mongoose successfully connects
  mongoose.connection.on('connected', () => {
    console.log("Database Connected")
  });

  // Step 2 : Actually connect to MongoDB
  // MONGODB_URI is your Atlas connection string from .env
  // 'mern-auth' is the database name that gets created insider Atlas
  await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
}

export default connectDB;