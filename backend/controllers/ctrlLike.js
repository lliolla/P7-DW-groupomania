// import models in table POSTS
const Model = require('../models');
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { log } = require('console');
const like = require('../models/like');
// const { log } = require('console');

exports.likeOnePost = (req,res,next)=>{
    let Idpost =req.params.id
    let userLike=req.body.UserId
    let liked =req.body.liked
    let disliked =req.body.disliked
//     
    console.log("post liké",Idpost,"par user :",userLike);
    
     Model.Like
     .findOne({
         where :{
            [Op.and]:[ {PostId : Idpost}, {UserId:userLike}] } })
     .then( existingLike => {
        if(!existingLike){
            console.log("vous pouvez commenter")
            if(disliked==true && liked==false ){
                console.log("vous avez like")
                Model.Like
                    .create(
                        {PostId : Idpost, UserId:userLike,likes :1,dislikes :0})
                    .then(()=>res.status(200).json( 
                        {disliked : false, liked:true }
                        ) )
                    .catch(error => res.status(400).json ({error : '1 une erreur est survenue'}))

            }else{
                console.log("vous avez disliké");
                Model.Like
                .create(
                    {PostId : Idpost, UserId:userLike, disLikes :1, likes:0})
                .then(()=>res.status(200).json( 
                    {disliked : true, liked:false}
                    ) )
                .catch(error => res.status(400).json ({error : '2 une erreur est survenue'}))
            } 
        }else{
            console.log("vous avez deja commenter cet article");
            if(disliked==true && liked==false ){
                console.log("vous avez enlevé like")
                Model.Like
                    .destroy(
                       {where: {PostId : Idpost, UserId:userLike}})
                    .then(()=>res.status(200).json( 
                        {disliked : false, liked:true}
                        ) )
                    .catch(error => res.status(400).json ({error : '3 une erreur est survenue'}))

            }else{
                console.log("vous avez enlevez disliké");
                Model.Like
                .destroy(
                    {where: {PostId : Idpost, UserId:userLike}})
                .then(()=>res.status(200).json( 
                    {disliked : true, liked:false}
                    ) )
                .catch(error => res.status(400).json ({error : '4 une erreur est survenue'}))
            } 
        }
     })

    .catch(error => res.status(404).json({ error: "un probleme est survenu"}))
      
   // const nbLikes = 
//     Model.Like.count({
//         where :{ likes :1   }
//     }).then(count=>{console.log(`total likes': ${count}`)
//     return count})

//     const nbDislikes = 
//     Model.Like.count({
//         where :{ dislikes :1   }
//     }).then(count=>{console.log(`total dislikes': ${count}`)})

//     if(!existingReaction ){
//         Model.Like
//         .create({PostId : Idpost, UserId:userLike})
//         .then(()=>res.status(200).json({message:"Article liké " }) )
//         .catch(error => res.status(400).json ({error : 'une erreur est survenue'}))

   
// }else{
//         Model.Like
//            .destroy({PostId : Idpost, UserId:userLike})
//            .then(()=>res.status(200).json({message:"Article disliké" }) )
//            .catch(error => res.status(400).json ({error : 'une erreur est survenue'}))
   
// }
    }
exports.getlike = (req,res,next)=>{  
 Model.Like.findAll({ 
 })
 .then( () => {
            Model.Like.count({
             where :{ likes :1   }})
             .then(countLikes=>res.status(200).json(countLikes))
     })
 .catch(error => res.status(404).json({ error: "likes pas mis a jour"}))

}
exports.getdislike = (req,res,next)=>{  
    Model.Like.findAll({ 
    })
    .then( () => {
               Model.Like.count({
                           where :{ likes :1   }
                    }).then(countDislike=>res.status(200).json(countDislike))
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


