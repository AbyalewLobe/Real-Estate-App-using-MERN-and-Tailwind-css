import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserListing,
  getUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyEmail } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/verify-email/:token", verifyEmail);
router.get("/test", test);
router.get("/getAllUsers", getAllUsers);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/:id", verifyToken, getUser);

export default router;
