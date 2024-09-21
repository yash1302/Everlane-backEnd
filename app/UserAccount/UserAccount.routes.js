import express from "express";
import { userRoutesConstants } from "../../constants/routes.constants.js";
import userAccountController from "./UserAccount.controller.js";
import { responseHandler } from "../../common/messageHandler.js";
const { SIGNUP, LOGIN } = userRoutesConstants;
const {signupUserController,loginUserController} = userAccountController
export const userRoutes = express.Router();

userRoutes.post(SIGNUP, async (req, res, next) => {
  try {
    const { loginId, password } = req.body;
    const signupUserResponse = await signupUserController(loginId, password);
    res.status(200).send(new responseHandler(signupUserResponse));
  } catch (error) {
    next(error);
  }
});

userRoutes.post(LOGIN,async(req,res,next)=>{
  try {
    const { loginId, password } = req.body;
    const loginUserResponse = await loginUserController(loginId, password);
    res.status(200).send(new responseHandler(loginUserResponse));
  } catch (error) {
    next(error);
  }
})
