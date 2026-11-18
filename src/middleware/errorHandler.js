const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: statusCode === 500
      ? "Terjadi kesalahan pada server"
      : err.message
  });
};

export default errorHandler;