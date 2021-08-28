const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const expressValidator = require("express-validator");
const ejs = require("ejs");
const mongoose = require('mongoose');
//line 8 is used to intsall express validator so that you can check the user input


//require a morgan package
//morgan package is to help to creates routes and req, res the HTTP easliy
const morgan = require("morgan")
//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const app = express();

//this line of code is use for ejs to use
app.set('view engine', 'ejs');




//this line will allow to add all css,images and jQuery stuff here to make the webiste good
app.use(express.static("public"));

//connection for mongoDB
mongoose.connect("mongodb://localhost:27017/ECommerceDB", {
  useNewUrlParser: true
});


//****************************middleware************************//
//app.use(bodyParser.json({ //-----//This line of code is use for capturin the data which was inputed my the user
  //extended: true
//}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev')); //----//this line of code is for used the morgon in the app
//now we can use the cookie-bodyParser to store the userinformation in the device
app.use(cookieparser());
app.use(expressValidator());//using the express validator for checking

//***********************middleware code will go here*********************//




//**********routes middleware***************//
//if you want u can use "/api " as a convection
app.use("/api", authRoutes);
app.use("/api", userRoutes);








//this line of code is writen to listen your server on the port 3000
app.listen(8000, function() {
  console.log("Server started on port 8000");
})
