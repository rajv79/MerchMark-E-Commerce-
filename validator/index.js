
exports.userSignupValidator = (req,res,next)=>{
  //we can able to use .check method because of expressValidator install
  req.check('name','Name is required').notEmpty();
  req.check("email","Email must be between 6 to 34 charcter long")
     .matches(/.+\@.+\..+/)
     .withMessage("Email must contain @")
     .isLength({min:4,max:32});

      req.check('password','password is required').notEmpty()
      req.check('password')
          .isLength({min:7})
          .withMessage('password must contaib at least 6 charcter with a combination of Digits')
          .matches(/\d/)
          .withMessage("Password must contain a number")
          req.check('gender',"Gender is required").notEmpty();
          req.check('Date',"Date is requires").notEmpty();
          //for showinng the dbErrorHandler
          const errors = req.validationErrors();
          if(errors){
            const firsterror = errors.map(error=>error.msg)[0];
            return res.status(400).json({error:firsterror});
          }
          //anytime when we are creating middleware we need to have next(); so that it will move to next
          next();

};
