import { userAccountMessages } from "./UserAccount.messages.js";
import UserAccount from "./UserAccount.services.js";
const { LOGINFAILURE, SIGNUPSUCCESS } = userAccountMessages;
import utils from "../../common/utils.js";

const {verifyPassword,hashPassword,generateJwtToken} = utils
const { loginUserService, signupUserService } = UserAccount;

const signupUserController = async (loginId, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    await signupUserService(loginId, hashedPassword);
    return SIGNUPSUCCESS;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUserController = async(loginId, password) => {
    try {
        const user = await loginUserService(loginId)
        const verifiedPassword = await verifyPassword(password,user[0]?._doc?.password)
        if(verifiedPassword){
            const token = await generateJwtToken(loginId)
            return token;
        }
        else{
            throw LOGINFAILURE
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default {signupUserController ,loginUserController};
