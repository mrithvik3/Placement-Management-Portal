import express from "express";
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Logged-in users
router.get("/", authMiddleware, getCompanies);
router.get("/:id", authMiddleware, getCompanyById);

// Admin only
router.post("/", authMiddleware, roleMiddleware("admin"), createCompany);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateCompany);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteCompany);

export default router;