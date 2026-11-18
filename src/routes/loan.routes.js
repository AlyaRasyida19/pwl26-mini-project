import express from "express";

import {
  getAllLoansController,
  createLoanController
} from "../controllers/loan.controller.js";

import validate from "../middleware/validate.js";
import { loanSchema } from "../validators/loan.validator.js";

const router = express.Router();

// Menampilkan semua data peminjaman
router.get("/", getAllLoansController);

// Menambahkan peminjaman dengan validasi Joi
router.post("/", validate(loanSchema), createLoanController);

export default router;
