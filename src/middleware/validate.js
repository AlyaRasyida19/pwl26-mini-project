const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validasi gagal",
        errors: error.details.map((detail) => detail.message)
      });
    }

    next();
  };
};

export default validate;
