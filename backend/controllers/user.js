var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.loginUser = (req,res,next)=>{
    let fetchedUserEmail,fetchedUserId
    User.findOne({ email:req.body.email }).then( user=>{
      fetchedUserEmail=user.email;
      fetchedUserId=user._id;
       if(!user)
       {
        return res.status(401).json({
           message:"Authentication failed!",
         });
       }
       return bcrypt.compare(req.body.password,user.password);
    }).then( (result)=>{
      if(!result)
      {
       return res.status(401).json({
          message:"Authentication failed!"
        });
      }
      const token = jwt.sign({ userEmail:fetchedUserEmail,userId:fetchedUserId },'i_will_be_hokage_one_day',
      {
        expiresIn:'1h',
      });

      res.status(200).json({
   
        token:token,
        expiresIn:3600,
        userId : fetchedUserId
      })
    }).catch( err=>{
      console.log(err);
      res.status(401).json({
        message:"Authentication failed!",
        error:err
      });
    })
}

exports.createUser =  (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,  
          password: hash
        });
    
    user.save()
      .then(result => {
        res.status(201).json({
          message: "User created succesfully",
          result: result
        })
      }).catch(err => {
          res.status(500).json({
              message:"Invalid authentication Credentials",
              error : err
          })
      });
    });
  }