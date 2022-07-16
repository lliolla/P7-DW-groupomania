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
    console.log('updateCmts');
    }
exports.createCmt =(req, res,next)=>{
   
    // Test datas comming Frontend and empty field
let content = req.body.content
console.log('content',content)

// find post who want to wright comment
let id_posts= req.body.id_posts

 Model.Post.findOne({
    attributes :['id'],
     where :{id:id_posts}
 })
 .then(postFound =>{
    if(postFound){
        let  id_users = postFound.id
        let newCmt ={ id_users,content,id_posts}
        console.log('newCmt',id_posts,id_users,content,);
        Model.Comment.create(newCmt)
        .then(newCmt=>res.status(200).json({message: "commentaire publié"}))
        .catch(error =>res.status(401).json({error:"impossible de créer le commentaire"}))
    }else{
        return res.status(409).json({ error: 'aucun utilisateur correspondant au token dans la bd'})  
    }

 
 } )
 .catch(error => res.status(400).json ({error: "requette impossible"}))


}
exports.delateCmt = (req,res,next)=>{
    console.log('delateCmts');
    }