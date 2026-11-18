
import prisma from "../prisma.js";

// Mengambil semua data buku dengan pagination dan filter judul
export const getAllBooks = async (halaman = 1, ukuran = 10, judul = "") => {
  const skip = (halaman - 1) * ukuran;

  return await prisma.book.findMany({
    where: judul
      ? {
          title: {
            contains: judul
          }
        }
      : {},
    skip: skip,
    take: ukuran,
    orderBy: {
      id: "asc"
    }
  });
};

// Mengambil satu buku berdasarkan ID
export const getBookById = async (id) => {
  return await prisma.book.findUnique({
    where: {
      id: Number(id)
    }
  });
};

// Menambahkan buku baru
export const createBook = async (data) => {
  return await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      year: Number(data.year),
      price: Number(data.price),
      stock: Number(data.stock),
      publishedAt: new Date(data.publishedAt)
    }
  });
};

// Mengubah data buku
export const updateBook = async (id, data) => {
  return await prisma.book.update({
    where: {
      id: Number(id)
    },
    data: {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      year: Number(data.year),
      price: Number(data.price),
      stock: Number(data.stock),
      publishedAt: new Date(data.publishedAt)
    }
  });
};

// Menghapus buku berdasarkan ID
export const deleteBook = async (id) => {
  return await prisma.book.delete({
    where: {
      id: Number(id)
    }
  });
};
