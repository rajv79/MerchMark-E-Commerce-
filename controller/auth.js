//now we have to require the model for the userSchema

const User = require("../models/user");
const jwt = require("jsonwebtoken"); //this is used to genrate sign token
const  expressJwt = require("express-jwt");//this will be used for authorization checking

const {errorHandler} = require("../helpers/dbErrorHandler");

///code from line 8 to  34 is for the user signup
exports.signup = (req,res)=>{

  console.log("req.body",req.body);
  //createing a new User from user model schema
  const user = new User(req.body);
  //now we will use the save method  to store this in the mongo data data

  user.save((err,user)=>{
      if(err){
        return res.status(400).json({
          err:errorHandler(err)
        });
        console.log(err);
      }

      //this line of code is used  not to send the  private infromation
      user.salt = undefined;
      user.hashed_password = undefined;

      ///this line of code is used  not to send the  private infromation
      res.json({
        user
      })


  })
};
///***********from here we have the code for sigin the user ************************//


exports.signin = (req,res)=>{

  //console.log("req.body informaton:-  " ,req.body);

  const {email,password} = req.body;
  User.findOne({email},(err,user)=>{
    if(err||!user){
    return res.status(400).json({
      err:"User with that email doest exist !! please Sign up"
    });
  }
      // if user is found make sure the email and password works

      //create authenticate method in user model

        if(!user.authenticate(password)){
          return res.status(401).json({
            error:'Email and password dont match'
          })
        }

      //generate a signed token with user id and sereate
      const token = jwt.sign({_id:user._id},"hefnereevv");

      //persist the token as t  in cookiw with expire date
      res.cookie("t",token,{expire:new Date()+9999});

      //return response with user and token to frontended client
      const {_id ,name ,email,role}= user
      return res.json({token, user :{_id,email,name ,role}});




  });


};
//******************signuout***********************//

  exports.signout = (req,res)=>{
    res.clearCookie("t");
    res.json({message:"Signout  Sccuess !! Thank you "})


};

//********************requiresigns***********************//

    exports.requireSignin = expressJwt({
      secret:"hefnereevv",
      //important adding algorithms to run this code
      algorithms: ['HS256'],
      userProperty:"auth"
    });
