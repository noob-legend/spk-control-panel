import express from "express";
import { auth, roleCheck } from "../middleware/auth.js";
import {
  getAllSPK,
  getSPKById,
  createSPK,
  updateSPK,
  deleteSPK,
} from "../controllers/spk.controller.js";

const router = express.Router();

router.get("/", getAllSPK);
router.get("/:id", getSPKById);
router.post("/", auth, roleCheck(["admin_produksi"]), createSPK);
router.put("/:id", auth, roleCheck(["admin_produksi"]), updateSPK);
router.delete("/:id", auth, roleCheck(["admin_produksi"]), deleteSPK);

export default router;
