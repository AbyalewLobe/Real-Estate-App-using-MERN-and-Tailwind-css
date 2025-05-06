import express from "express";

import {
  signup,
  signin,
  google,
  signOut,
  admin,
} from "../controllers/auth.controller.js";
import { isAdmin } from "../utils/isAdmin.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);
router.get("/admin", isAdmin, admin);
export default router;
