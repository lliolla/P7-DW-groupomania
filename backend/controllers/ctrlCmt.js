// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");

exports.getAllCmt = (req,res,next)=>{
console.log('getAllCmts');
Model.Comment.findAll({
    attributes :['id', 'content', 'id_users', 'id_posts','updatedAt'],
    include: {
        Model:User,
        attributes:['id']
    } ,
    order: [["id", "DESC"]],
})
.then(comts=> console.log('comts',comts)  )
.catch()
}

exports.getOneCmt = (req,res,next)=>{
    console.log('getOneCmts');

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