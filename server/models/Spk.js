import mongoose from "mongoose";

const spkSchema = new mongoose.Schema({
  nomor_spk: { type: String, required: true },
  nomor_oc: { type: String, required: true },
  customer: { type: String, required: true },
  proyek: { type: String, required: true },
  level_kepentingan: { type: Number, required: true }, // 1=urgent, 2=medium, 3=normal
  status: {
    type: String,
    enum: ["Produksi", "Packing", "Pengiriman", "Selesai"],
    required: true,
  },
  tanggal_dibuat: { type: Date, required: true },
  tanggal_deadline: { type: Date }, // optional, kalau selesai
  total_unit: { type: Number, default: 0 },
});

export default mongoose.model("SPK", spkSchema);
