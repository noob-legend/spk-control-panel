import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth || !headerAuth.startsWith("Beare ")) {
    return res
      .status(500)
      .json({ message: "mohon maaf tidak di temukan token" });
  }

  const token = headerAuth.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = User.findById(decoded.id).select("-password");
  if (!user) {
    return res.status(500).json({ message: "mohon maaf user tidak ditemukan" });
  }

  req.user = user;
  next();
};

export const roleCheck = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "forbidden" });
  }
  next();
};
