import {
  getAllBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService
} from "../services/book.service.js";

// Menampilkan semua data buku dengan pagination dan filter
export const getAllBooksController = async (req, res, next) => {
  try {
    const halaman = Number(req.query.halaman) || 1;
    const ukuran = Number(req.query.ukuran) || 10;
    const judul = req.query.judul || "";

    const books = await getAllBooksService(halaman, ukuran, judul);

    res.status(200).json({
      message: "Berhasil mengambil data buku",
      halaman: halaman,
      ukuran: ukuran,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// Menampilkan satu buku berdasarkan ID
export const getBookByIdController = async (req, res, next) => {
  try {
    const book = await getBookByIdService(req.params.id);

    res.status(200).json({
      message: "Berhasil mengambil detail buku",
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Menambahkan buku baru
export const createBookController = async (req, res, next) => {
  try {
    const book = await createBookService(req.body);

    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Mengubah data buku
export const updateBookController = async (req, res, next) => {
  try {
    const book = await updateBookService(req.params.id, req.body);

    res.status(200).json({
      message: "Buku berhasil diperbarui",
      data: book
    });
  } catch (error) {
    next(error);
  }
};


// Menghapus buku
export const deleteBookController = async (req, res, next) => {
  try {
    await deleteBookService(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
