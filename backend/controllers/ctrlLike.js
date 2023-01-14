// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { log } = require('console');
// const { log } = require('console');

exports.likeOnePost = (req,res,next)=>{
    let Idpost =req.params.id
    let userLike=req.body
    console.log("post liké",Idpost,"par",userLike);
    Model.Like
    .findOne({
        where :{PostId : userLike,UserId : userLike} })
    .then( updateLikes => { console.log("updateLikes return true") })
    .catch(error => res.status(404).json({ error: "likes pas mis a jour"}))
            
    }
exports.getlike = (req,res,next)=>{
    
let PostId= req.params.id 
let UserId=req

console.log("post liké",PostId,"Userlike",UserId);

 Model.Like.findOne({
     where : {PostId :req.params.id},
     attributes :['UserId'] 
 })
 .then( userFound => {
         console.log("userFound",userFound.UserId)
         
     })
 .catch(error => res.status(404).json({ error: "likes pas mis a jour"}))



// Model.Like.update(
//          updateLike,
//              {where : {PostId : PostId} })
//         .then( updateLikes => {
//             console.log("updateLikes",updateLikes);
//         })
//     .catch(error => res.status(404).json({ error: "likes pas mis a jour"}))

}
// exports.postLiked =(req,res,next)=>{
//     let Idpost =req.params.id
//     let updateLike=req.body
//     console.log("backend likes",updateLike,Idpost);
    
//     Model.Post.update(
//         updateLike,
//         {where : {id : Idpost} })
//     .then( updateLikes => res.status(200).json(updateLikes))
//     .catch(error => res.status(404).json({ error: "likes pas mis a jour"}))
    

//   // id du post 
//   // if req.body.like (renvoi 1 ou -1)
//   // si renvoi 1 alors increment like de 1 l'utilisateur aime le post => req.body.like renvoi 1 

//   //sinon si incremente dislike de 1 l'utilisateur n'aime pas le post => req.body.like renvoi -1 

//   // sinon  decremnete like de -1 l'utilisateur n'aime plus le post


//   //sion si decremente dislikes de -1 l'utilsateur enleve sont dislike


