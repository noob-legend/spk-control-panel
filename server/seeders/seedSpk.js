import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import SPK from "../models/Spk.js";

// ===== FIX dotenv path =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// ============================

const seedSPK = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await SPK.deleteMany(); // optional: hapus data lama

    await SPK.insertMany([
      {
        nomor_spk: "SPK-001",
        nomor_oc: "OC-1001",
        customer: "PT Maju Jaya",
        proyek: "Perumahan Grand Residence",
        level_kepentingan: 1,
        status: "Produksi",
        tanggal_dibuat: new Date("2026-02-01"),
        tanggal_deadline: new Date("2026-02-20"),
        total_unit: 120,
      },
      {
        nomor_spk: "SPK-002",
        nomor_oc: "OC-1002",
        customer: "PT Sinar Abadi",
        proyek: "Apartemen Harmoni",
        level_kepentingan: 2,
        status: "Packing",
        tanggal_dibuat: new Date("2026-02-03"),
        tanggal_deadline: new Date("2026-02-25"),
        total_unit: 85,
      },
      {
        nomor_spk: "SPK-003",
        nomor_oc: "OC-1003",
        customer: "PT Cahaya Baru",
        proyek: "Hotel Sentosa",
        level_kepentingan: 3,
        status: "Pengiriman",
        tanggal_dibuat: new Date("2026-02-05"),
        tanggal_deadline: new Date("2026-03-01"),
        total_unit: 60,
      },
      {
        nomor_spk: "SPK-004",
        nomor_oc: "OC-1004",
        customer: "CV Mandiri",
        proyek: "Ruko Central Park",
        level_kepentingan: 1,
        status: "Produksi",
        tanggal_dibuat: new Date("2026-02-06"),
        tanggal_deadline: new Date("2026-02-18"),
        total_unit: 150,
      },
      {
        nomor_spk: "SPK-005",
        nomor_oc: "OC-1005",
        customer: "PT Mega Konstruksi",
        proyek: "Mall City Plaza",
        level_kepentingan: 2,
        status: "Packing",
        tanggal_dibuat: new Date("2026-02-07"),
        tanggal_deadline: new Date("2026-02-28"),
        total_unit: 200,
      },
      {
        nomor_spk: "SPK-006",
        nomor_oc: "OC-1006",
        customer: "PT Nusantara",
        proyek: "Gedung Perkantoran",
        level_kepentingan: 3,
        status: "Produksi",
        tanggal_dibuat: new Date("2026-02-08"),
        tanggal_deadline: new Date("2026-03-05"),
        total_unit: 75,
      },
      {
        nomor_spk: "SPK-007",
        nomor_oc: "OC-1007",
        customer: "PT Bintang Timur",
        proyek: "Rumah Sakit Sehat",
        level_kepentingan: 1,
        status: "Packing",
        tanggal_dibuat: new Date("2026-02-09"),
        tanggal_deadline: new Date("2026-02-22"),
        total_unit: 110,
      },
      {
        nomor_spk: "SPK-008",
        nomor_oc: "OC-1008",
        customer: "CV Sejahtera",
        proyek: "Sekolah Internasional",
        level_kepentingan: 2,
        status: "Pengiriman",
        tanggal_dibuat: new Date("2026-02-10"),
        tanggal_deadline: new Date("2026-03-10"),
        total_unit: 95,
      },
      {
        nomor_spk: "SPK-009",
        nomor_oc: "OC-1009",
        customer: "PT Sentral",
        proyek: "Cluster Emerald",
        level_kepentingan: 3,
        status: "Produksi",
        tanggal_dibuat: new Date("2026-02-11"),
        tanggal_deadline: new Date("2026-03-15"),
        total_unit: 130,
      },
      {
        nomor_spk: "SPK-010",
        nomor_oc: "OC-1010",
        customer: "PT Karya Utama",
        proyek: "Villa Mountain View",
        level_kepentingan: 1,
        status: "Pengiriman",
        tanggal_dibuat: new Date("2026-02-12"),
        tanggal_deadline: new Date("2026-02-27"),
        total_unit: 50,
      },
    ]);

    console.log("SPK data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedSPK();
