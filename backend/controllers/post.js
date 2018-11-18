var Post = require('../models/post');

exports.createPost = (req,res)=>
{   
    const url = req.protocol + '://' + req.get("host");
    console.log('url',url);
    var posts = new Post({
       imagePath : url + '/images/'+ req.file.filename,
       heading : req.body.heading,
       description : req.body.description,
       creator : req.userData.userId //this is a string but will be converted to a mangoose object Id
    });
    console.log('userdata',req.userData);
   // return res.status(200).json({});
    posts.save().then( createdPost => {
        console.log('post is real');
    res.status(201).json({
       message : 'Post created Successfully',
       post: {
           ...createdPost,
           _id:createdPost._id
       }
    }).catch(()=>{
      message:"User not Authorised";
    });

    });
    
}

exports.editPost = (req,res,next)=>{
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;//this req.file.filename comes from the multer 
      //i.e. its due to multer that req has filename method
    }
    
    const posts = new Post({
        _id : req.params.id,
        heading : req.body.heading,
        description : req.body.description,
        imagePath : imagePath,
        creator: req.userData.userId     
    });
    console.log('gsgeg',posts._id);
    console.log('id',req.params.id);
    console.log('re1.id',req.body);
    console.log('description',req.body.description);
    //console.log('description',req.file.filename);

    Post.findByIdAndUpdate({ _id:req.params.id, creator:req.userData.userId}, posts,{upsert: true, new: true}).then( result=>{
        return res.status(201).json({ message:"Post updated successfully" });
    }).catch(error=>{
        res.status(500).json({
            message: "Couldn't udpate post because of "+ error
          });      });;
}

exports.getPost = (req,res,next)=>
{   
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    const pageQuery = Post.find();
    let fetchedPost;
    if(pageSize && currentPage)
    {
        pageQuery
        .skip(pageSize * (currentPage-1))
        .limit(pageSize);
    }

    pageQuery
      .then( docs =>{
          fetchedPost = docs;
        return Post.countDocuments();
        })
        .then(count =>{
            res.status(201).json({
            message : 'Post fetched Successfully',
            posts:fetchedPost,
            maxPosts : count
        });
    })
}

exports.deletePost = (req,res,next)=>{
    Post.deleteOne({ _id:req.params.id,"creator":req.userData.userId }).then( result=>{
        console.log(result);
    });
            res.status(200).json({
                message : 'Post deleted Successfully',
            }).catch(()=>{
                message:"User not Authorised"
              });;
        }