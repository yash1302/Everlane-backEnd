import express from "express";
import { adminRoutesConstants } from "../../constants/routes.constants.js";
import { authenticateJwtToken } from "../../middleware/middleware.js";
import adminAccountContoller from "./controller.js";
import { successStatusCodes } from "../../constants/responseStatus.constants.js";
import { responseHandler } from "../../common/messageHandler.js";
import { upload } from "../../middleware/attachment.middleware.js";

const { ok } = successStatusCodes;
const {
  loginAdminController,
  signupAdminController,
  addNewProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
} = adminAccountContoller;
const {
  LOGIN,
  SIGNUP,
  ADDNEWPRODUCT,
  DELETEPRODUCT,
  GETALLPRODUCTS,
  UPDATEPRODUCT,
} = adminRoutesConstants;

export const adminRoutes = express.Router();

adminRoutes.post(LOGIN, async (req, res, next) => {
  try {
    const {
      body: { loginId, password },
    } = req;
    const loginAdminResponse = await loginAdminController(loginId, password);
    res.status(ok).send(new responseHandler(loginAdminResponse));
  } catch (error) {
    next(error);
  }
});

adminRoutes.post(SIGNUP, async (req, res, next) => {
  try {
    const { loginId, password } = req.body;
    const signupAdminResponse = await signupAdminController(loginId, password);
    res.status(ok).send(new responseHandler(signupAdminResponse));
  } catch (error) {
    next(error);
  }
});

adminRoutes.post(
  ADDNEWPRODUCT,
  authenticateJwtToken,
  upload.any(),
  async (req, res, next) => {
    try {
      const { body, files } = req;
      const addnewProductResponse = await addNewProductController(body, files);
      res.status(ok).send(new responseHandler(addnewProductResponse));
    } catch (error) {
      next(error);
    }
  }
);

adminRoutes.post(
  DELETEPRODUCT,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { productId } = req.body;
      const deleteProductResponse = await deleteProductController(productId);
      res.status(ok).send(new responseHandler(deleteProductResponse));
    } catch (error) {
      next(error);
    }
  }
);

adminRoutes.post(
  UPDATEPRODUCT,
  authenticateJwtToken,
  upload.any(),
  async (req, res, next) => {
    try {
      const { body, files } = req;
      const updateProductResponse = await updateProductController(body, files);
      res.status(ok).send(new responseHandler(updateProductResponse));
    } catch (error) {
      next(error);
    }
  }
);

adminRoutes.get(
  GETALLPRODUCTS,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const getAllProductsResponse = await getAllProductsController();
      res.status(ok).send(new responseHandler(getAllProductsResponse));
    } catch (error) {
      next(error);
    }
  }
);
