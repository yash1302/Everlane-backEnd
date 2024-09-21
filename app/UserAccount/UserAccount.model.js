import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  loginId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

export default User;