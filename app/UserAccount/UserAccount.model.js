import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
