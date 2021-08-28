const mongoose = require('mongoose');
//the below line of code is change the password ans saved it as crypto
const crypto = require('crypto'); //----remmber to install this package
const { v1: uuidv1 } = require('uuid'); //-----//----remmber to install this package


// make userSchema for storing user in databaase
const userSchema = new mongoose.Schema({


    //thi will be all the fiels that the user signup page will have
    name: {
      type: String,
      trim: true,
      require: [true, "Please enter Your Name"],
      maxlenght: 32
    },
    email: {
      //this is email validiation code that will check if the email is correct or not and remmebr to install the npm i mongoose -email- type to hyper v

      type: String,
      //work: {type: mongoose.SchemaTypes.Email, required: true},
      unique: true
    },
    hashed_password: {
      type: String,
      require: [true, "Please enter a password"]
    },
    birthday: {
      type: Date,


    },
    // Add 'enum' of an array of options to force selection between a given number of options.
    // Anything other than "male" or "female" will be invalid.
    gender: {
      type: String,
      enum: ["male", "female"]
    },

    //the belwo salt is definfed to hash the password which is inputed by the user
    salt: String,

    //the below line of code is used to show the user is admin or regualr user

    role: {
      type: Number,
      default: 0
      //0 is defind for the regeular user and 1 is definda for the admin
    },

    history: {
      type: Array,
      default: []
    }


  },
  //the timestamps will help to store the current date and time when the user is register
  {
    timestamps: true
  }
);

//Adding virtuall fields for password hashing

userSchema.virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
  })

  .get(function() {
    return this._passowrd
  })

//thi line of code is used to create a method that is used to hash password
userSchema.method ({

  authenticate:function(plainText){
    return this.encryptPassword(plainText)===this.hashed_password;
  },
  
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return console.log("There was an error in the password hashing" + err)
    }
  }
});

//now we have to exports this mongoose.model to create new model in the app.js controller  class when ever the user is register
module.exports = mongoose.model("User", userSchema);
