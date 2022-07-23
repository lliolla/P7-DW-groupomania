// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");


exports.getAllCmt = (req,res,next)=>{
console.log('getAllCmts');
Model.Comment.findAll({
    attributes :['id', 'content','updatedAt','id_users','id_posts'],  
    order: [["id", "DESC"]],
})
.then(cmt=> res.status(200).json(cmt))
.catch(error => res.status(404).json({error : "aucun commentaires pour cette publication" }))
}

exports.getOnePostCmts = (req,res,next)=>{
    console.log('getOneCmts',req.params.id, req.body);
    Model.Comment.findAll({
      where : {id_posts : req.params.id},
      attributes :['id','content','id_users', 'id_posts','updatedAt'],
      include: {
        model: Model.User ,
        attributes:['username','avatar']
    } ,
      
      order: [["id", "DESC"]],
    })
    .then(OnePostCmts=> res.status(200).json(OnePostCmts))
    .catch(error => res.status(400).json ({error : 'il n y a pas de commentaires pour ce posts'}))

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
    .then(OneCmt=>{
        if(OneCmt){
            res.status(200).json(OneCmt)
            console.log("post pret a envoyé en bd",OneCmt)
        }else{
            return res.stauts(404).json(error=>{error:"il n'y a pas de commentaires pour cette publication"})
        }
     
    })   
    .catch(error =>res.status(500).json({error:"aucun commentaire existant"}))
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
let content = req.body.content
let id_posts =req.body.id_posts
let id_users =req.body.id_users

if ( content==null||content <= 0 ){
    return res.status(400).json({ error: "le commentaire ne peut pas etre envoyé vide " });
  }

Model.Post.findOne({
where : {id :id_posts}
})
.then(postFound =>{
    if(postFound){
    let id_posts =  postFound.id 
    let newCmt = {content,id_users,id_posts}
    console.log("commentaire pret a envoyé en bd",newCmt)
    Model.Comment.create(newCmt)
    .then( res.status(200).json({message: 'commentaire créer avec succès '}) ) 
    .catch(error => res.status(400).json ({error: "requette impossible"})) 
    }else{
        return res.status(409).json({ error: 'aucun utilisateur correspondant au token dans la bd'})
    }
})
.catch(error => res.status(500).json({ error: "requette impossible"}))

//  


}
exports.delateCmt = (req,res,next)=>{
    console.log('delateCmts');
    Model.Comment.destroy({
        where : {id : req.params.id}
    })
    .then(delateCmt=>{res.status(200).json(delateCmt)})
    .catch(error=>res.status(404).json({ error: "un problème a eu lieu lors de la suppression du commentaire"}))
    }