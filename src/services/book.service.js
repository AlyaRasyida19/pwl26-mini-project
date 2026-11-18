import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../data/book.data.js";

// Mengambil semua data buku dengan pagination dan filter
export const getAllBooksService = async (halaman, ukuran, judul) => {
  return await getAllBooks(halaman, ukuran, judul);
};

// Mengambil satu buku berdasarkan ID
export const getBookByIdService = async (id) => {
  const book = await getBookById(id);

  if (!book) {
    const error = new Error("Buku tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

// Menambahkan buku baru
export const createBookService = async (data) => {
  try {
    return await createBook(data);
  } catch (error) {
    if (error.code === "P2002") {
      const conflictError = new Error("ISBN sudah digunakan");
      conflictError.statusCode = 409;
      throw conflictError;
    }

    throw error;
  }
};

// Mengubah data buku
export const updateBookService = async (id, data) => {
  await getBookByIdService(id);

  try {
    return await updateBook(id, data);
  } catch (error) {
    if (error.code === "P2002") {
      const conflictError = new Error("ISBN sudah digunakan oleh buku lain");
      conflictError.statusCode = 409;
      throw conflictError;
    }

    throw error;
  }
};


export const deleteBookService = async (id) => {
  await getBookByIdService(id);

  try {
    return await deleteBook(id);
  } catch (error) {
    if (error.code === "P2003") {
      const conflictError = new Error(
        "Buku memiliki riwayat peminjaman dan tidak dapat dihapus"
      );
      conflictError.statusCode = 409;
      throw conflictError;
    }

    throw error;
  }
};

