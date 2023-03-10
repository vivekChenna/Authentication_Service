const UserService = require("../services/user-service");

const userService = new UserService();
const create = async (req, res) => {
  const filterData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const response = await userService.create(filterData);

    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully created a user ",
      err: {},
    });
  } catch (error) {
    res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      err:error.explanation,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await userService.destroy(req.params.id);

    return res.status(200).json({
      success: true,
      message: "successfully deleted a user ",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      data: {},
      success: false,
      message: "not able to create a user ",
      err: { error },
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await userService.getUser(req.params.id);

    return res.status(200).json({
      data: response,
      success: true,
      message: "successfully fetched details of a user ",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      data: {},
      success: false,
      message: "not able to fetch details of  a user ",
      err: { error },
    });
  }
};

const SignIn = async (req, res) => {
  try {
    const response = await userService.SignIn(
      req.body.email,
      req.body.password
    );

    return res.status(200).json({
      data: response,
      success: true,
      err: {},
      message: "User signed in successfully",
    });
  } catch (error) {
    // console.log(error)
    res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation ,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const response = await userService.isAuthenticated(token);

    // console.log(response);

    res.status(200).json({
      data: response,
      success: true,
      message: "user is authenticated and user is valid",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      data: {},
      success: false,
      message: "not able to authenticate",
      err: { error },
    });
  }
};


const isAdmin = async (req,res)=>{

try {

  const response  = await userService.isAdmin(req.body.id);

  return res.status(200).json({

    data : response,
    success : true,
    err : {},
    message : "successfully fetched whether user is admin or not ",

  })
  
} catch (error) {
  console.log(error);

  res.status(500).json({

    data : {},
    success : false,
    err : {error},
    message : "something went wrong ",

  })
}


}

module.exports = {
  create,
  destroy,
  get,
  SignIn,
  isAuthenticated,
  isAdmin
};
