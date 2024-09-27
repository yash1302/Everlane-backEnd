import adminSideModel from "./model.js";

const { Admin, Product } = adminSideModel;

const signupAdminService = async (loginId, password) => {
  try {
    const adminInsert = new Admin({
      emailId: loginId,
      password: password,
    });
    const result = await adminInsert.save();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginAdminService = async (loginId) => {
  try {
    const adminPresent = Admin.find({
      emailId: loginId,
    });
    return adminPresent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addNewProductService = async (productInfo, images) => {
  try {
    const product = new Product({
      productName: productInfo.productName,
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
      productQuantity: productInfo.productQuantity,
      productCategory: productInfo.productCategory,
      avaliableSizes: productInfo.productSize,
      gender: productInfo.productGender,
      productImage: images,
    });
    const result = await product.save();
    return result;
  } catch (error) {
    throw error;
  }
};

const searchProductNamesService = async (productInfo) => {
  try {
    const productPresent = Product.find({
      productName: productInfo.productName,
    });
    return productPresent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateProductService = async (productInfo, images) => {
  try {
    const updateFields = {};
    const fieldsToUpdate = {
      productDescription: "productDescription",
      productPrice: "productPrice",
      productQuantity: "productQuantity",
      productCategory: "productCategory",
      avaliableSizes: "productSize",
      gender: "productGender",
      productImage: "images",
    };

    for (const key in fieldsToUpdate) {
      const productInfoKey = fieldsToUpdate[key];
      if (productInfo[productInfoKey] !== undefined) {
        updateFields[key] = productInfo[productInfoKey];
      }
    }

    if (images) {
      updateFields.productImage = images;
    }

    console.log(updateFields);

    const product = Product.findOneAndUpdate(
      { productName: productInfo.productName },
      {
        $set: updateFields,
      },
      { new: true }
    );
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteProductService = async (productId) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllProductsService = async () => {
  try {
    const products = await Product.find({ isDeleted: false });
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.find({
      $and: [{ _id: productId }, { isDeleted: true }],
    });
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  loginAdminService,
  signupAdminService,
  addNewProductService,
  searchProductNamesService,
  updateProductService,
  deleteProductService,
  getAllProductsService,
  getProductById,
};
