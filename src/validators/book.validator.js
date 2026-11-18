import Joi from "joi";

// Aturan validasi untuk data buku
export const bookSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  author: Joi.string().trim().min(3).required(),
  isbn: Joi.string().trim().min(5).required(),
  year: Joi.number().integer().min(1000).max(9999).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  publishedAt: Joi.date().iso().required()
});
