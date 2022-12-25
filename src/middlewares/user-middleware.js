const CreateValidateUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: "send correct data",
      success: false,
      data: {},
    });
  }

  next();
};

module.exports = {
  CreateValidateUser,
};
