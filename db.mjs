import mongoose from "mongoose";

let isConnected = false; // track the connection

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
