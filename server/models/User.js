import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin_produksi", "admin_packing", "pengunjung"],
      default: "pengunjung",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
