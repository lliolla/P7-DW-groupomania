// creation d'un router
const express= require('express');
const router = express.Router();

// import du controller et des middleware
const cmtCtrl = require('../controllers/cmtCtrl');
const auth = require('../middleware/auth');// on protege les routes avec les tokens

//routes d'authentification
 router.get('/',cmtCtrl.getAllCmtsByUser )
 router.get('/',cmtCtrl.getOneCmtsByUser )
 router.delete('/:id',cmtCtrl.delateCmtByUser )
 router.put('/:id',cmtCtrl.updateCmtsByUser )


module.exports = router

