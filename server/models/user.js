import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  cart: [
    {
      productid: { type: String },
      productname: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
});

export default mongoose.model("User", userSchema);
