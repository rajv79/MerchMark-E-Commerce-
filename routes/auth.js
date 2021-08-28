
//we have to require express whenever we make a new "name".js
const express = require("express");
//calling the Router method from the expreess
const router = express.Router();

//how to call controller in the routes and here we are calling the signup controller
const {signup,signin,signout,requireSignin} = require("../controller/auth");
const {userSignupValidator}= require("../validator");



//**************we cana als write the routes method in this way
//router.get("/",function(req,res){
  //res.send("Hello worrld !! lets come to the fight");
//});
//****************************//****************************************


router.post("/signup",userSignupValidator,signup);
router.post("/signin",signin);
//creates a signout method
router.get("/signout",signout);

//router.get("/hello", requireSignin,(req,res)=>{
//  res.send("hello there");
//})





//the export this file to the app.js we use this method
module.exports = router;
