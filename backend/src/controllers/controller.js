import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import CustomerDetails from "../models/customerDetails.js";
import multer from "multer";
import UserModel from "../models/user.js";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const uploads = multer({
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
});

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    const options = {
      expiresIn: "30d",
    };
    if (passOk) {
      jwt.sign(
        { email, id: userDoc._id },
        SECRET_KEY,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json({
            id: userDoc._id,
            email,
          });
        },
        options
      );
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

export const userProfile = async (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, SECRET_KEY, {}, (err, info) => {
      if (err) {
        throw err;
      }
      res.json(info);
    });
  } catch (err) {
    console.log(err);
  }
};
// logoout
export const logout = async (req, res) => {
  res.cookie("token", "").json("ok");
};
export const createNewUser = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname?.split(".");
    const ext = parts.length > 1 ? parts[parts.length - 1] : "";
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
      if (err) {
        throw err;
      }
      const { name, age, occupation, address, phoneNo } = req.body;
      const postDoc = await CustomerDetails.create({
        name,
        age,
        address,
        occupation,
        phoneNo,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create new user." });
  }
};
export const getCustomerData = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters
    const limit = parseInt(req.query.limit) || 20; // Get the number of items per page from query parameters

    let query = {};

    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    const count = await CustomerDetails.countDocuments(query); // Get the total count of customers matching the query

    const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

    const skip = (page - 1) * limit; // Calculate the number of items to skip

    let customers;

    if (searchQuery) {
      customers = await CustomerDetails.find(query)
        .populate("author", ["email"])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      customers = await CustomerDetails.find(query)
        .populate("author", ["email"])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    res.json({ customers, totalPages });
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
};


export const getSingleCustomerData = async (req, res) => {
  const { id } = req.params;
  const postDoc = await CustomerDetails.findById(id).populate("author", [
    "email",
  ]);
  res.json(postDoc);
};

export const UpdateCustomer = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname?.split(".");
    const ext = parts.length > 1 ? parts[parts.length - 1] : "";
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;

  jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const { id, name, age,occupation,phoneNo,address, } = req.body;
    const postDoc = await CustomerDetails.findOneAndUpdate(
      { _id: id, author: info.id },
      {
        name,
        age,
        phoneNo,
        occupation,
        address,
        cover: newPath ? newPath : null, // Set null if newPath is falsy
      },
      { new: true }
    );

    if (!postDoc) {
      return res.status(400).send("You are not the author of this post.");
    }

    res.json(postDoc);
  });
};
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await CustomerDetails.findByIdAndDelete(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};