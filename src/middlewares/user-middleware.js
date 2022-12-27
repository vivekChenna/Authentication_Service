const ValidateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: 'Email or Password missing in the incoming request',
      success: false,
      data: {},
    })
  }

  next()
}

module.exports = {
  ValidateUserAuth,
}
