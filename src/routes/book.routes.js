import express from "express";

import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController
} from "../controllers/book.controller.js";

import validate from "../middleware/validate.js";
import { bookSchema } from "../validators/book.validator.js";

const router = express.Router();

// Menampilkan semua buku
router.get("/", getAllBooksController);

// Menampilkan satu buku berdasarkan ID
router.get("/:id", getBookByIdController);

// Menambahkan buku dengan validasi Joi
router.post("/", validate(bookSchema), createBookController);

// Mengubah buku dengan validasi Joi
router.put("/:id", validate(bookSchema), updateBookController);

// Menghapus buku
router.delete("/:id", deleteBookController);

// Export router
export default router;
