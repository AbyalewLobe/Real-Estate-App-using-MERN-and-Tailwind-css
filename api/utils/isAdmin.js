import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { errorHanndle } from "./error.js";

export const isAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHanndle(401, "Access denied. No token."));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return next(errorHanndle(404, "User not found."));
    if (!user.isAdmin)
      return next(errorHanndle(403, "Access denied. Admins only."));

    req.user = user;
    next();
  } catch (err) {
    next(errorHanndle(401, "Invalid token."));
  }
};
