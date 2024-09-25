<<<<<<< Updated upstream
=======
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const secretKey = process.env.SECRETKEY;

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

const generateJwtToken = async (loginId) => {
  const options = { expiresIn: "1h" };
  return jsonwebtoken.sign({ loginId: loginId }, secretKey, options);
};

const verifyToken = async (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, secretKey);
    return { success: true, data: decoded };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const imageUpload = async (dataURI) => {
  try {
    const data = await cloudinary.uploader.upload_large(dataURI, {
      resource_type: "auto",
    });
    return data.secure_url;
  } catch (error) {
    throw error;
  }
};

export default {
  hashPassword,
  verifyPassword,
  generateJwtToken,
  verifyToken,
  imageUpload,
};
>>>>>>> Stashed changes
