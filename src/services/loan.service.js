import {
  getAllLoans,
  createLoan
} from "../data/loan.data.js";

// Mengambil semua data peminjaman
export const getAllLoansService = async () => {
  return await getAllLoans();
};

// Membuat peminjaman baru
export const createLoanService = async (data) => {
  return await createLoan(data);
};
