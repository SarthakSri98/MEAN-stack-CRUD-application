var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var appRoutes = require('./routes/posts');
var appUser = require('./routes/users');

var path  = require('path');



//mongo connection
mongoose.connect('mongodb://localhost/testdb',{useNewUrlParser: true });
mongoose.set('debug', true);
mongoose.connection.once('open',function(){
    console.log("Connection has been made");
}).on('error',(err)=>{
    console.log("Connection error:",err);
})


//bodyParser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/images',express.static(path.join("backend/images")));
//for removing CORS errors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept'),
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE,OPTIONS,authorization'),
     next();
});

app.use('/api/posts',appRoutes);
app.use('/api/users',appUser);

module.exports = app;