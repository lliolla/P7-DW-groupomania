// creation d'un router
const express= require('express');
const router = express.Router();

// import du controller et des middleware
const userCtrl = require('../controllers/ctrlUser');
const auth = require('../middleware/auth');// on protege les routes avec les tokens
const multer = require ('../middleware/multer.js')

//routes des users
 router.get('/',auth,userCtrl.getAllUsers )
 router.get('/:id',auth,userCtrl.displayUser )
 router.delete('/:id',auth,multer,userCtrl.delateUser )
 router.put('/:id',auth,multer,userCtrl.updateUser ) 


module.exports = router

