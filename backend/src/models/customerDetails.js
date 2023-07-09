import mongoose from "mongoose";

const { Schema } = mongoose;
//here i have made schema for customer details
const CustomerSchema = new Schema(
  {
    name: String,
    age:Number,
    phoneNo:Number,
    occupation:String,
    address:String,
    cover: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("CustomerDetails", CustomerSchema);
export default CustomerModel;

