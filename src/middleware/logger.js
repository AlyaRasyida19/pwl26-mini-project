const logger = (req, res, next) => {
  // Mencatat request setelah response selesai dikirim
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode}`
    );
  });

  next();
};

export default logger;
