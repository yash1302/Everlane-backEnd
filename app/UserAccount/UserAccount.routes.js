import express from "express";
import { userRoutesConstants } from "../../constants/routes.constants.js";
import userAccountController from "./UserAccount.controller.js";
import { responseHandler } from "../../common/messageHandler.js";
import { authenticateJwtToken } from "../../middleware/middleware.js";
import { successStatusCodes } from "../../constants/responseStatus.constants.js";
const { SIGNUP, LOGIN, GETUSERDETAILS, ADDUSERDETAILS } = userRoutesConstants;
const {
  signupUserController,
  loginUserController,
  getUserDetailsController,
  addUserDetailsController,
} = userAccountController;
export const userRoutes = express.Router();
const { ok } = successStatusCodes;

userRoutes.post(SIGNUP, async (req, res, next) => {
  try {
    const { loginId, password } = req.body;
    const signupUserResponse = await signupUserController(loginId, password);
    res
      .status(signupUserResponse.statusCode)
      .send(new responseHandler(signupUserResponse));
  } catch (error) {
    next(error);
  }
});

userRoutes.post(LOGIN, async (req, res, next) => {
  try {
    const { loginId, password } = req.body;
    const loginUserResponse = await loginUserController(loginId, password);
    res.status(200).send(new responseHandler(loginUserResponse));
  } catch (error) {
    next(error);
  }
});

userRoutes.get(GETUSERDETAILS, authenticateJwtToken, async (req, res, next) => {
  try {
    const {
      locals: { loginId },
    } = res;
    const getUserDetailsResponse = await getUserDetailsController(loginId);
    res.status(ok).send(new responseHandler(getUserDetailsResponse));
  } catch (error) {
    next(error);
  }
});

userRoutes.post(
  ADDUSERDETAILS,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const {
        body: { firstName, lastName, contactDetails },
      } = req;
      const userAddedResponse = await addUserDetailsController(
        firstName,
        lastName,
        contactDetails,
        res
      );
      res
        .status(userAddedResponse.statusCode)
        .send(new responseHandler(userAddedResponse));
    } catch (error) {
      next(error);
    }
  }
);
