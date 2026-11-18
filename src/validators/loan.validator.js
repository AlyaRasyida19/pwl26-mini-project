import Joi from "joi";

// Aturan validasi untuk peminjaman buku
export const loanSchema = Joi.object({
  bookId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "ID buku harus berupa angka",
      "number.integer": "ID buku harus bilangan bulat",
      "number.positive": "ID buku harus lebih dari 0",
      "any.required": "ID buku wajib diisi"
    }),

  borrowerName: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
      "string.empty": "Nama peminjam tidak boleh kosong",
      "string.min": "Nama peminjam minimal 3 karakter",
      "any.required": "Nama peminjam wajib diisi"
    }),

  quantity: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Jumlah pinjaman harus berupa angka",
      "number.integer": "Jumlah pinjaman harus bilangan bulat",
      "number.positive": "Jumlah pinjaman harus lebih dari 0",
      "any.required": "Jumlah pinjaman wajib diisi"
    })
});
