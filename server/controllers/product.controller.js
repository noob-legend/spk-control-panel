import Product from "../models/Product.js";
import SPK from "../models/Spk.js";

/*
========================================
CREATE PRODUCT
POST /api/product
========================================
*/
export const createProduct = async (req, res) => {
  try {
    const { spk_id } = req.body;
console.log("REQ BODY:", req.body);
    // Validasi SPK ada
    const spkExists = await SPK.findById(spk_id);
    if (!spkExists) {
      return res.status(404).json({
        success: false,
        message: "SPK tidak ditemukan",
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Produk berhasil dibuat",
      data: product,
    });
  } catch (error) {
  console.error("CREATE PRODUCT ERROR FULL:", error);
  res.status(500).json({
    success: false,
    message: error.message,
    error: error
  });
}};

/*
========================================
GET ALL PRODUCT
GET /api/product
========================================
*/
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("spk_id");

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
GET PRODUCT BY ID
GET /api/product/:id
========================================
*/
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("spk_id");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
GET PRODUCT BY SPK
GET /api/product/spk/:spkId
========================================
*/
export const getProductsBySpk = async (req, res) => {
  try {
    const products = await Product.find({
      spk_id: req.params.spkId,
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
UPDATE PRODUCT
PUT /api/product/:id
========================================
*/
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil diupdate",
      data: product,
    });
  } catch (error) {
    console.error("ERROR UPDATE PRODUCT:", error); // 🔥 tambahkan ini
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
DELETE PRODUCT
DELETE /api/product/:id
========================================
*/
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
