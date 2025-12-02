import { verifyToken } from "../utils/jwt.js";

export const requireProtect = (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);  // ADD THIS
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
