// creation d'un router
const express= require('express');
const router = express.Router();

// import du controller et des middleware
const cmtCtrl = require('../controllers/ctrlCmt');
const auth = require('../middleware/auth');// on protege les routes avec les tokens

//routes d'authentification
 router.get('/post/:id',auth,cmtCtrl.getOnePostCmts )
 router.get('/',auth,cmtCtrl.getAllCmt )
 router.get('/:id',auth,cmtCtrl.getOneCmt )
 router.post('/',auth,cmtCtrl.createCmt)
 router.delete('/:id',auth,cmtCtrl.delateCmt )
 router.put('/:id',auth,cmtCtrl.updateCmt )


module.exports = router

