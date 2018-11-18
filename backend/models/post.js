var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = new Schema({
     heading : { type:String  },
     description : { type:String },
     imagePath : { type:String },
     creator : { type: mongoose.Schema.Types.ObjectId , ref:"User"  }
},{index: true});

module.exports = mongoose.model('Post',postSchema); //Post's P should always be uppercase
//collectin name will be Post 