import mongoose from "mongoose";

let connected = false;

export default async function connectDB() {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected.");
  } catch (error) {
    console.log(error);
  }
}
