import {
  getAllLoansService,
  createLoanService
} from "../services/loan.service.js";

// Menampilkan semua data peminjaman beserta detail buku
export const getAllLoansController = async (req, res, next) => {
  try {
    const loans = await getAllLoansService();

    res.status(200).json({
      message: "Berhasil mengambil data peminjaman",
      data: loans
    });
  } catch (error) {
    next(error);
  }
};

// Menambahkan peminjaman baru
export const createLoanController = async (req, res, next) => {
  try {
    const loan = await createLoanService(req.body);

    res.status(201).json({
      message: "Peminjaman berhasil ditambahkan",
      data: loan
    });
  } catch (error) {
    next(error);
  }
};
