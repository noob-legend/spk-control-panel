import mongoose from "mongoose";

const paletSchema = new mongoose.Schema(
  {
    nomor_palet: {
      type: Number,
      required: true,
      min: 0,
    },
    photo_bukti: {
      type: String,
      required: true,
      trim: true,
    },
    tanggal_kirim: {
      type: Date,
      required: true,
    },
    total_product: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Palet", paletSchema);
