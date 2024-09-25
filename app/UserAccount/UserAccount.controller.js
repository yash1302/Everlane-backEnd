import { userAccountMessages } from "./UserAccount.messages.js";
import UserAccount from "./UserAccount.services.js";
const {
  LOGINFAILURE,
  SIGNUPSUCCESS,
  USERPRESENT,
  USERDETAILSADDED,
  USERDETAILSADDITIONFAILED,
  UNAUTHORIZED,
} = userAccountMessages;
import utils from "../../common/utils.js";

const { verifyPassword, hashPassword, generateJwtToken } = utils;
const { loginUserService, signupUserService, addUserDetailsService } =
  UserAccount;

const signupUserController = async (loginId, password) => {
  try {
    const isUserPresent = await loginUserService(loginId);
    if (isUserPresent.length > 0) {
      throw USERPRESENT;
    } else {
      const hashedPassword = await hashPassword(password);
      await signupUserService(loginId, hashedPassword);
      return SIGNUPSUCCESS;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUserController = async (loginId, password) => {
  try {
    const user = await loginUserService(loginId);
    if (user.length > 0) {
      const verifiedPassword = await verifyPassword(
        password,
        user[0]?._doc?.password
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

const getUserDetailsController = async (loginId) => {
  try {
    const user = await loginUserService(loginId);
    return user[0]?._doc?.emailId
      ? { emailId: user[0]?._doc?.emailId }
      : { phoneNumber: user[0]?._doc?.phoneNumber };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addUserDetailsController = async (
  firstName,
  lastName,
  contactDetails,
  res
) => {
  try {
    const userAdded = await addUserDetailsService(
      firstName,
      lastName,
      contactDetails,
      res
    );
    if (userAdded) {
      return USERDETAILSADDED;
    } else {
      throw USERDETAILSADDITIONFAILED;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  signupUserController,
  loginUserController,
  getUserDetailsController,
  addUserDetailsController,
};
