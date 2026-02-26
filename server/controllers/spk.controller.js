import SPK from "../models/Spk.js";
import Product from "../models/Product.js";

/* =========================
   GET ALL SPK
   ========================= */
export const getAllSPK = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        { nomor_spk: { $regex: search, $options: "i" } },
        { customer: { $regex: search, $options: "i" } },
      ];
    }

    // Status filter
    if (status && status !== "all") {
      query.status = status;
    }

    const total = await SPK.countDocuments(query);

    const data = await SPK.find(query)
      .sort({ level_kepentingan: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET SPK BY ID
   ========================= */
export const getSPKById = async (req, res) => {
  try {
    const spk = await SPK.findById(req.params.id);

    if (!spk) {
      return res.status(404).json({
        success: false,
        message: "SPK tidak ditemukan",
      });
    }

    const products = await Product.find({
      spk_id: req.params.id,
    });

    res.json({
      success: true,
      data: {
        ...spk.toObject(),
        detail_produk: products,
      },
    });
  } catch (error) {
    console.error("ERROR getSPKById:", error); // 🔥 penting
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* =========================
   CREATE SPK
   ========================= */
export const createSPK = async (req, res) => {
  try {
    const data = req.body;

    const existing = await SPK.findOne({ nomor_spk: data.nomor_spk });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Nomor SPK sudah digunakan",
      });
    }

    const newSPK = await SPK.create(data);

    res.status(201).json({
      success: true,
      message: "SPK berhasil dibuat",
      data: newSPK,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE SPK
   ========================= */
export const updateSPK = async (req, res) => {
  try {
    const updated = await SPK.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "SPK tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "SPK berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE SPK
   ========================= */
export const deleteSPK = async (req, res) => {
  try {
    const deleted = await SPK.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "SPK tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "SPK berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
