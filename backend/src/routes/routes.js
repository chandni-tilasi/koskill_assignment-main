import express from "express";
import {
  LoginUser,
  registerUser,
  userProfile,
  logout,
  createNewUser,
  getCustomerData,
  getSingleCustomerData,
  UpdateCustomer,
  deleteCustomer,
} from "../controllers/controller.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.use(cookieParser()); 

router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/profile", userProfile);
router.post("/logout", logout);
router.post("/createNewUser", uploadMiddleware.single("file"), createNewUser);
router.get("/createNewUser", getCustomerData);
router.get("/createNewUser/:id", getSingleCustomerData);
router.put("/createNewUser", uploadMiddleware.single("file"), UpdateCustomer);
router.delete("/createNewUser/:id",deleteCustomer)

export default router;
