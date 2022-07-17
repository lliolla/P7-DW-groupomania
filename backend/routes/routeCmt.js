// creation d'un router
const express= require('express');
const router = express.Router();

// import du controller et des middleware
const cmtCtrl = require('../controllers/ctrlCmt');
const auth = require('../middleware/auth');// on protege les routes avec les tokens

//routes d'authentification
 router.get('/post/:id',cmtCtrl.getOnePostCmts )
 router.get('/',cmtCtrl.getAllCmt )
 router.get('/:id',cmtCtrl.getOneCmt )
 router.post('/',cmtCtrl.createCmt)
 router.delete('/:id',cmtCtrl.delateCmt )
 router.put('/:id',cmtCtrl.updateCmt )


module.exports = router

