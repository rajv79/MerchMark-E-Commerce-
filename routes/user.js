
const express = require("express");

const router = express.Router();

const {requireSignin} = require("../controller/auth");



const {

  userById} = require("../controller/auth");


router.get("/secret/:userId",requireSignin,(req,res)=>{
  res.json({
    user:req.profile
  });
});

//**************we cana als write the routes method in this way
//router.get("/",function(req,res){
  //res.send("Hello worrld !! lets come to the fight");
//});
//****************************//****************************************


//here we are going to take router.param insted of router. get/post
router.param("userId",userById);





//the export this file to the app.js we use this method
module.exports = router;
