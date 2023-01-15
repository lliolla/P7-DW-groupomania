// creation d'un router
const express= require('express');
const router = express.Router();

// import du controller et des middleware
const likeCtrl = require('../controllers/ctrlLike');
const auth = require('../middleware/auth');// on protege les routes avec les tokens

//routes d'authentification
 
router.get('/',auth,likeCtrl.getlike )
router.get('/dislike/',auth,likeCtrl.getdislike )
router.post('/post/:id',auth,likeCtrl.likeOnePost )


module.exports = router

