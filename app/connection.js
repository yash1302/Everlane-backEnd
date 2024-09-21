import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default mongoConnection;
