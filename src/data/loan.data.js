import prisma from "../prisma.js";

// Mengambil semua data peminjaman beserta detail buku
export const getAllLoans = async () => {
  return await prisma.loan.findMany({
    include: {
      book: true
    },
    orderBy: {
      id: "asc"
    }
  });
};

// Membuat peminjaman sekaligus mengurangi stok buku
export const createLoan = async (data) => {
  return await prisma.$transaction(async (tx) => {

    // Mencari buku berdasarkan ID
    const book = await tx.book.findUnique({
      where: {
        id: Number(data.bookId)
      }
    });

    // Memeriksa apakah buku tersedia
    if (!book) {
      const error = new Error("Buku tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    // Memeriksa apakah stok mencukupi
    if (book.stock < Number(data.quantity)) {
      const error = new Error("Stok buku tidak mencukupi");
      error.statusCode = 422;
      throw error;
    }

    // Membuat data peminjaman
    const loan = await tx.loan.create({
      data: {
        bookId: Number(data.bookId),
        borrowerName: data.borrowerName,
        quantity: Number(data.quantity)
      },
      include: {
        book: true
      }
    });

    // Mengurangi stok buku
    await tx.book.update({
      where: {
        id: Number(data.bookId)
      },
      data: {
        stock: {
          decrement: Number(data.quantity)
        }
      }
    });

    return loan;
  });
};
