// create controller
const express = require ('express');
const router = express.Router();

//import controllers and moddleware

const postCtrl = require('../controllers/ctrlPost');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');



// routes 
router.get('/',postCtrl.getAllPosts);
router.get('/:id',postCtrl.getOnePost);
router.get('/user/:id',postCtrl.getOneUserPosts)//tout les posts d'un user
router.post('/',multer,postCtrl.createPost);
router.put('/:id',multer,postCtrl.updatePost);
router.delete('/:id',postCtrl.delatePost);


module.exports = router