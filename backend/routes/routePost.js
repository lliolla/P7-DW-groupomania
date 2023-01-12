// create controller
const express = require ('express');
const router = express.Router();

//import controllers and moddleware

const postCtrl = require('../controllers/ctrlPost');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');



// routes 
router.get('/',auth,postCtrl.getAllPosts);
router.get('/:id',auth,postCtrl.getOnePost);//display one post
router.get('/user/:id',auth,postCtrl.getOneUserPosts );//display all posts of one user
router.post('/',multer,auth,postCtrl.createPost);
router.put('/:id',multer,auth,postCtrl.updatePost);
router.delete('/:id',auth,postCtrl.delatePost);
router.post('/like/:id',auth,postCtrl.postLiked);



module.exports = router