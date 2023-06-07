import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

const secret = `${process.env.SECRET_KEY}`;

export const signup = async (req, res) => {
  const { firstname, lastname, email, password, contact } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User Already Exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({
      name: `${firstname} ${lastname}`,
      email,
      password: hashedPassword,
      contact,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User Doesn't Exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const savecart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    // Find the user by ID
    const user = await UserModal.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    // Update the user's cart with the new items
    user.cart = cartItems;

    // Save the user with updated cart into MongoDB
    await user.save();

    res.status(200).json({ message: "Cart Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Save Cart" });
  }
};
