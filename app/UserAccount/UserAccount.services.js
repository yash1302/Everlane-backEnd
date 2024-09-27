import User from "./UserAccount.model.js";

const signupUserService = async (loginId, password) => {
  try {
    let userInsert;
    if (typeof loginId === "string") {
      userInsert = new User({
        emailId: loginId,
        password: password,
      });
    } else if (typeof loginId === "number") {
      userInsert = new User({
        phoneNumber: loginId,
        password: password,
      });
    }
    const result = await userInsert.save();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUserService = async (loginId) => {
  try {
    let userPresent;
    if (typeof loginId === "string") {
      userPresent = User.find({
        emailId: loginId,
      });
    } else if (typeof loginId === "number") {
      userPresent = User.find({
        phoneNumber: loginId,
      });
    }
    return userPresent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addUserDetailsService = async(firstName,lastName,contactDetails,res)=>{
  try {
    if(typeof res?.locals.loginId === 'number'){
      const user = await User.findOneAndUpdate(
        { phoneNumber: res?.locals.loginId },
        { $set: { firstName: firstName, lastName: lastName, emailId: contactDetails } },
        { new: true }
      );
      return user;
    }
    else if(typeof res?.locals.loginId === 'string'){
      const user = await User.findOneAndUpdate(
        { emailId: res?.locals.loginId },
        { $set: { firstName: firstName, lastName: lastName, phoneNumber: contactDetails } },
        { new: true }
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
}

export default { signupUserService, loginUserService,addUserDetailsService };
