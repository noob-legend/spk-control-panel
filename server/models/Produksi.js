import mongoose from "mongoose";

const produksiSchema = new mongoose.Schema(
  {
    nomor_spk: {
      type: String,
      required: true,
      trim: true,
      unique: true, // biasanya SPK itu unik
    },
    buyer: {
      type: String,
      required: true,
      trim: true,
    },
    item: {
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Produksi", produksiSchema);
