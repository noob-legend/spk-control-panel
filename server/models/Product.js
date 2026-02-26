import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: true,
      trim: true,
    },
    item: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    warna: {
      type: String,
      required: true,
      trim: true,
    },
    tebal: {
      type: Number,
      required: true,
      min: 0,
    },
    lebar: {
      type: Number,
      required: true,
      min: 0,
    },
    panjang: {
      type: Number,
      required: true,
      min: 0,
    },
    qty: {
      type: Number,
      required: true,
      min: 0,
    },
    press: {
      type: Number,
      required: true,
      min: 0,
    },
    sisa: {
      type: Number,
      required: true,
      min: 0,
    },
    spk_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SPK",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // otomatis createdAt & updatedAt
  },
);

export default mongoose.model("Product", productSchema);
