import express from "express";
import env from "dotenv";
import connectDB from "./config/connectDB.js";
import spkRoutes from "./routes/spk.route.js";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.route.js";
import { auth, roleCheck } from "./middleware/auth.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

env.config();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/spk", spkRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log("berhasil terhubung ke port : ", PORT);
});
