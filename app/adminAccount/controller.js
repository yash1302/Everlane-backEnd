import adminServices from "./services.js";
import utils from "../../common/utils.js";
import { adminAccountMessages } from "./messages.js";

const {
  LOGINFAILURE,
  SIGNUPSUCCESS,
  ADMINPRESENT,
  UNAUTHORIZED,
  PRODUCTNOTFOUND,
} = adminAccountMessages;

const { verifyPassword, hashPassword, generateJwtToken, imageUpload } = utils;

const {
  loginAdminService,
  signupAdminService,
  addNewProductService,
  searchProductNamesService,
  updateProductService,
  deleteProductService,
  getAllProductsService,
  getProductById,
} = adminServices;

const signupAdminController = async (loginId, password) => {
  try {
    const isAdminPresent = await loginAdminService(loginId);
    if (isAdminPresent.length > 0) {
      throw ADMINPRESENT;
    } else {
      const hashedPassword = await hashPassword(password);
      await signupAdminService(loginId, hashedPassword);
      return SIGNUPSUCCESS;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginAdminController = async (loginId, password) => {
  try {
    const adminPresent = await loginAdminService(loginId, password);
    if (adminPresent.length > 0) {
      const verifiedPassword = await verifyPassword(
        password,
        adminPresent[0]?._doc?.password
      );
      if (verifiedPassword) {
        const token = await generateJwtToken(loginId);
        return token;
      } else {
        throw UNAUTHORIZED;
      }
    } else {
      throw LOGINFAILURE;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addNewProductController = async (information, image) => {
  try {
    const imageLinks = image.map((file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const imageUrl = imageUpload(dataURI);
      return imageUrl;
    });
    const imageResponses = await Promise.all(imageLinks);
    const productPresent = await searchProductNamesService(information);
    if (productPresent?.length) {
      const result = await updateProductService(information, imageResponses);
      return result;
    } else {
      const result = await addNewProductService(information, imageResponses);
      return result;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProductController = async (information, images) => {
  try {
    if (images.length > 0) {
      const imageLinks = images.map((file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const imageUrl = imageUpload(dataURI);
        return imageUrl;
      });
      const imageResponses = await Promise.all(imageLinks);
      const result = await updateProductService(information, imageResponses);
      return result;
    } else {
      const result = await updateProductService(information);
      return result;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProductController = async (productId) => {
  try {
    const productPresent = await getProductById(productId);
    if (productPresent.length > 0) {
      throw PRODUCTNOTFOUND;
    }
    const result = await deleteProductService(productId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllProductsController = async () => {
  try {
    const products = await getAllProductsService();
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  loginAdminController,
  signupAdminController,
  addNewProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
};
