import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await User.deleteMany(); // optional (hapus semua user lama)

    await User.create([
      {
        username: "admin_produksi",
        email: "produksi@company.com",
        password: await bcrypt.hash("123456", 10),
        role: "admin_produksi",
      },
      {
        username: "admin_packing",
        email: "packing@company.com",
        password: await bcrypt.hash("123456", 10),
        role: "admin_packing",
      },
      {
        username: "pengunjung",
        email: "visitor@company.com",
        password: await bcrypt.hash("123456", 10),
        role: "pengunjung",
      },
    ]);

    console.log("Users seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
