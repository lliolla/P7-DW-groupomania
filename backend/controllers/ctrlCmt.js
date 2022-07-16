// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");

exports.getAllCmt = (req,res,next)=>{
console.log('getAllCmts');
Model.Comment.findAll({
    attributes :['id', 'content','updatedAt'],
    include: [ Model.Post] ,
    order: [["id", "DESC"]],
})
.then(cmt=> res.status(200).json(cmt))
.catch(error => res.status(404).json({error : "aucun commentaires pour cette publication" }))
}
// ajouter une condition pour tester si les commentaire existe et renvoye un message d'erreure si la table est vide
exports.getOneCmt = (req,res,next)=>{
    console.log('getOneCmts',req.params.id);
    Model.Comment.findOne({
        where : {id : req.params.id}, 
        attributes :[
        'id',
        'id_users',
        'id_posts',
        'content',
        'updatedAt',]   
    })
    .then(OneCmt=>res.status(200).json(OneCmt) )
    .catch(error =>res.status(404).json({error:"aucun commentaire pour ce post"}))
}

exports.updateCmt = (req,res,next)=>{
    
    let content = req.body.content;
    console.log('updateCmts',content);
   
   Model.Comment.update(
    content,
    {where :{id :req.params.id}}
   )
   .then(updateCmt=>res.status(200).json(updateCmt))

    }
exports.createCmt =(req, res,next)=>{
   
// Test datas comming Frontend and empty field

// find user who send message
    //  const token = req.headers.authorization.split(' ')[1];
    //  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //  const id_users = decodedToken.userId;
// find post who want to wright comment

let newCmt =(req.body)
console.log('content',newCmt)
 Model.Comment.create(newCmt )
 .then( res.status(200).json({message: 'commentaire créer avec succès '}) ) 

.catch(error => res.status(400).json ({error: "requette impossible"}))


}
exports.delateCmt = (req,res,next)=>{
    console.log('delateCmts');
    Model.Comment.destroy({
        where : {id : req.params.id}
    })
    .then(delateCmt=>{res.status(200).json(delateCmt)})
    .catch(error=>res.status(404).json({ error: "un problème a eu lieu lors de la suppression du commentaire"}))
    }