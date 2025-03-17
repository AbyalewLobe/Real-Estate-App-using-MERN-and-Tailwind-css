import { errorHanndle } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHanndle(401, "Unautorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHanndle(403, "Forbidden"));
    req.user = user;
    next();
  });
};
