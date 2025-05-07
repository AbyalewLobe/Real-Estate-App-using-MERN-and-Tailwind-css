import express from "express";

import {
  signup,
  signin,
  google,
  signOut,
  admin,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { isAdmin } from "../utils/isAdmin.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);
router.get("/admin", isAdmin, admin);
router.get("/verify-email/:token", verifyEmail);
export default router;
