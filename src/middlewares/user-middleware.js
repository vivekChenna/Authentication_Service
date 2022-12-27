const ValidateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: 'Email or Password missing in the incoming request',
      success: false,
      data: {},
    })
  }

  next();
}

const ValidateIsAdminRequest  = (req,res,next)=>{

  if(!req.body.id){
    res.status(400).json({

      success:false,
      message : 'something went wrong ',
      err : "not given the user id ",
      data : {},

    })

  }

  next();




}

module.exports = {
  ValidateUserAuth,
  ValidateIsAdminRequest
}
