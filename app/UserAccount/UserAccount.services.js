import mongoConnection from "../connection.js";
import User from "./UserAccount.model.js";

const signupUserService = async (loginId, password) => {
  try {
    const userInsert = new User({
      loginId: loginId,
      password: password,
    });
    const result = await userInsert.save();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUserService = async (loginId) => {
  try {
    const userPresent = User.find({
      loginId: loginId,
    });
    return userPresent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { signupUserService, loginUserService };
