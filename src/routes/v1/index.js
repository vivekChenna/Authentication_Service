const userController = require("../../controllers/user-controller");

const middlewareFunctions  =require('../../middlewares/user-middleware');

const express = require("express");

const router = express.Router();


router.post('/signup',middlewareFunctions.ValidateUserAuth,userController.create);

router.get('/user/:id',userController.get);

router.post('/signin',middlewareFunctions.ValidateUserAuth,userController.SignIn);

router.get('/isAuthenticated',userController.isAuthenticated);

router.get('/isAdmin',middlewareFunctions.ValidateIsAdminRequest,userController.isAdmin);


module.exports = router;
