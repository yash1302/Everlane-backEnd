import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  emailId: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

const product = new mongoose.Schema(
  {
    productName: {
      type: "string",
    },
    productDescription: {
      type: "string",
    },
    productPrice: {
      type: "number",
    },
    productImage: {
      type: "array",
    },
    productQuantity: {
      type: "number",
    },
    productCategory: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    avaliableSizes: {
      type: "array",
    },
    isDeleted: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", product);

const Admin = mongoose.model("Admin", adminSchema);

export default { Admin, Product };
