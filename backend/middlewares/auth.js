var express = require('express');
var mongoose = require('mongoose');
var app = express();
var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
    const token = req.headers.authorization;
    console.log('token at auth',token);
    const decodedToken = jwt.verify(token,'i_will_be_hokage_one_day');
    req.userData = { email:decodedToken.email , userId: decodedToken.userId };

    next();
    }
    catch(error){
      res.status(201).json({message:'failed'});
      console.log(error);
    }
}