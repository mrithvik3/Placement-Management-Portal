import express from "express";

import {
  applyToCompany,
  withdrawApplication,
  getMyApplications,
  getCompanyApplicants,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===========================
   Student Routes
=========================== */

// Apply to a company
router.post(
  "/apply/:companyId",
  authMiddleware,
  roleMiddleware("student"),
  applyToCompany
);

// Withdraw application
router.delete(
  "/withdraw/:companyId",
  authMiddleware,
  roleMiddleware("student"),
  withdrawApplication
);

// Get logged-in student's applications
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("student"),
  getMyApplications
);

/* ===========================
   Admin Routes
=========================== */

// Get applicants for a company
router.get(
  "/company/:companyId",
  authMiddleware,
  roleMiddleware("admin"),
  getCompanyApplicants
);

// Update application status
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateApplicationStatus
);

export default router;