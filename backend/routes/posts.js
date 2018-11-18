var express = require('express');
var router = express.Router();
var multer = require('multer');
var checkAuth = require('../middlewares/auth');
var postController = require('../controllers/post');


const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid)
        {
            error = null;
        }
        cb(error,"backend/images");

    },
    filename : (req,file,cb)=>{
       const name = file.originalname.toLowerCase().split(' ').join('-');
       const ext = MIME_TYPE_MAP[file.mimetype];
       cb(null,name+'-'+Date.now()+'.'+ext);
       console.log("file image saved");
    }
});
var upload = multer({storage:storage});
// for posting data
router.post('',checkAuth, upload.single('image'),postController.createPost);

//for updating data
router.put('/:id',checkAuth,upload.single('image'),postController.editPost);
router.get('',postController.getPost);

router.delete('/:id',checkAuth,postController.deletePost);
module.exports = router;