import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import { cloudConfig } from "./config.js";
dotenv.config();


export const mongoConnection = async () => {
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

export const Cloudinary =  cloudinary.config(cloudConfig);
