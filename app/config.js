import dotenv from "dotenv";
dotenv.config();

export const cloudConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};
