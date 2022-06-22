// create controller
const express = require ('express');
const router = express.Router();

//import controllers and moddleware

const postCtrl = require('../controllers/ctrlPost');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');



// routes 
router.get('/',postCtrl.getAllPosts);
router.get('/:id',postCtrl.getOnePost);//display one post
router.get('/user/:id',postCtrl.getOneUserPosts );//display all posts of one user
router.post('/',multer,postCtrl.createPost);
router.put('/:id',multer,postCtrl.updatePost);
router.delete('/:id',postCtrl.delatePost);


module.exports = router