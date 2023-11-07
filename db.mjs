import mongoose from "mongoose";

let isConnected = false; // track the connection

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("db already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
