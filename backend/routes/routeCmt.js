// creation d'un router
const express= require('express');
const router = express.Router();

// import du controller et des middleware
const cmtCtrl = require('../controllers/cmtCtrl');
const auth = require('../middleware/auth');// on protege les routes avec les tokens

//routes d'authentification
 router.get('/',cmtCtrl.getAllCmts )
 router.get('/',cmtCtrl.getOneCmts )
 router.post('/',cmtCtrl.createCmts)
 router.delete('/:id',cmtCtrl.delateCmt )
 router.put('/:id',cmtCtrl.updateCmts )


module.exports = router

