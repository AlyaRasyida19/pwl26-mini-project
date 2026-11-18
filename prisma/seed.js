import prisma from "../src/prisma.js";

// Data awal buku yang akan dimasukkan ke database
const books = [
  {
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    isbn: "9789793062792",
    year: 2005,
    price: 90000,
    stock: 15,
    publishedAt: new Date("2005-09-01")
  },
  {
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    isbn: "9786021234568",
    year: 2009,
    price: 85000,
    stock: 10,
    publishedAt: new Date("2009-07-01")
  }
];

// Memasukkan buku tanpa membuat duplikat ISBN
async function main() {
  for (const book of books) {
    await prisma.book.upsert({
      where: {
        isbn: book.isbn
      },
      update: {},
      create: book
    });
  }

  console.log("Data awal buku berhasil dimasukkan!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
