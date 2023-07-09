import mongoose from "mongoose";

// Here i have made user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
