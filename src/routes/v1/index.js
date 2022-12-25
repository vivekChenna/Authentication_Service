const userController = require("../../controllers/user-controller");

const middlewareFunctions  =require('../../middlewares/user-middleware');

const express = require("express");

const router = express.Router();


router.post('/signup',middlewareFunctions.CreateValidateUser,userController.create);

router.get('/user/:id',userController.get);


module.exports = router;
