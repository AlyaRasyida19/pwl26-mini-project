import express from "express";
import "dotenv/config";
import prisma from "./prisma.js";

import bookRoutes from "./routes/book.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware untuk membaca request JSON
app.use(express.json());

// Middleware untuk mencatat aktivitas request
app.use(logger);

// Menghubungkan route buku
app.use("/books", bookRoutes);

// Menghubungkan route peminjaman
app.use("/loans", loanRoutes);

// Route utama untuk mengecek server
app.get("/", (req, res) => {
  res.json({
    message: "Books API berhasil dijalankan!",
    status: "success"
  });
});

// Route untuk menguji koneksi database
app.get("/test-db", async (req, res) => {
  try {
    await prisma.$connect();

    res.json({
      message: "Koneksi database berhasil!",
      status: "success"
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      message: "Koneksi database gagal",
      status: "error"
    });
  }
});

// Middleware untuk menangani error
app.use(errorHandler);

// Menjalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
