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
    const product = Product.findOneAndUpdate(
      { productName: productInfo.productName },
      {
        $set: {
          productDescription: productInfo.productDescription,
          productPrice: productInfo.productPrice,
          productQuantity: productInfo.productQuantity,
          productCategory: productInfo.productCategory,
          avaliableSizes: productInfo.productSize,
          gender: productInfo.productGender,
          productImage: images,
        },
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
      { $set: { isDeleted: TextTrackCue } },
      { new: true }
    );
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
  deleteProductService
};
