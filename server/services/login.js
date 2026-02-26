import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";

const login = (email, password) => {
  const user = User.findOne({ email });
  if (!user) {
    throw new Error("mohon maaf email atau password anda salah");
  }

  const comparePassword = bcrypt.compare(user.password, password);
  if (!comparePassword) {
    throw new Error("mohon maaf email atau password anda salah");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return token;
};
