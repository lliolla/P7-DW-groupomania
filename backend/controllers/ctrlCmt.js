// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");

exports.getAllCmt = (req,res,next)=>{
console.log('getAllCmts');
}

exports.getOneCmt = (req,res,next)=>{
    console.log('getOneCmts');

}

exports.updateCmt = (req,res,next)=>{
    console.log('updateCmts');
    }
exports.createCmt =(req, res,next)=>{
   
    // Test dats comming Frontend and empty field

// find post who want to wright comment
let id_posts= req.body.id_posts

 Model.Post.findOne({
    attributes :['id'],
     where :{id:id_posts}
 })
 .then(postFound =>{
    if(postFound){
        let  id_users = postFound.id
        let content = req.body.content
        let newCmt ={ id_users,content,id_posts}
        console.log('newCmt',newCmt);
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