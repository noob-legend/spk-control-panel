import express from "express";
import { auth, roleCheck } from "../middleware/auth.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsBySpk,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// CREATE
router.post("/", auth, roleCheck(["admin_produksi"]), createProduct);

// READ
router.get("/", getAllProducts);
router.get("/spk/:spkId", getProductsBySpk); // ✅ taruh dulu
router.get("/:id", getProductById); // ✅ paling bawah

// UPDATE
router.put("/:id", auth, roleCheck(["admin_produksi"]), updateProduct);

// DELETE
router.delete("/:id", auth, roleCheck(["admin_produksi"]), deleteProduct);

export default router;
