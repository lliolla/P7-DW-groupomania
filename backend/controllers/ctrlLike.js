// import models in table POSTS
const Model = require('../models');

exports.likeOnePost = (req,res,next)=>{
    let PostId =req.params.id
    let UserId=req.body.UserId
    let liked =req.body.liked
    let disliked =req.body.disliked
//     
    console.log("post liké",PostId,"par user :",UserId,liked,disliked);
    Model.Like.findOne({
        where :{ PostId, UserId }
    })
    .then(exist=>{
       if(!exist){
        console.log("like")
        Model.Like
          .create(
              {PostId , UserId,type :true})
          .then(()=>res.status(200).json( 
              {disliked : true, liked:false ,}
              ) )
          .catch(error => res.status(400).json ({error : '1 une erreur est survenue'}))
       }else{
        console.log("vous n'aimez plus")
        Model.Like
         .destroy(
            {where: {PostId, UserId}})
         .then(()=>res.status(200).json( 
             {disliked : false, liked:true}
             ) )
         .catch(error => res.status(400).json ({error : '3 une erreur est survenue'}))
       }
    })
    .catch(error => res.status(400).json ({error : '3 une erreur est survenue'}))

    }
exports.dislikeOnePost = (req,res,next)=>{
    let PostId =req.params.id
    let UserId=req.body.UserId
    let liked =req.body.liked
    let disliked =req.body.disliked
    const nbDislikes = 
     Model.Like.count({
         where :{ type :false  }
     }).then(count=>{console.log(`total likes': ${count}`)
     return count})
     .catch(e=> console.log(e))
//     
    console.log("post disliké",PostId,"par user :",UserId,liked,disliked);
    Model.Like.findOne({
        where :{ PostId, UserId }
    })
    .then(exist=>{
       if(!exist){
        console.log("dislike")
        Model.Like
          .create(
              {PostId , UserId,type:false,})
          .then(()=>res.status(200).json( 
              {disliked : true, liked:false ,nbDislikes}
              ) )
          .catch(error => res.status(400).json ({error : '1 une erreur est survenue'}))
       }else{
        console.log("vous aimez de nouveau")
        Model.Like
         .destroy(
            {where: {PostId, UserId}})
         .then(()=>res.status(200).json( 
             {disliked : false, liked:true, type:false}
             ) )
         .catch(error => res.status(400).json ({error : '3 une erreur est survenue'}))
       }
    })
    .catch(error => res.status(400).json ({error : '3 une erreur est survenue'}))
    
 
        }
exports.getLike = (req,res,next)=>{  
    let PostId =req.params.id   
 Model.Like.count({
 where :{ type :true , PostId }
 })
 .then(countDislike=>res.status(200).json(countDislike))
.catch(() => res.status(500).json({ error: "requette impossible"}))

}
exports.getDislike = (req,res,next)=>{  
 let PostId =req.params.id   
 Model.Like.count({
 where :{ type :false , PostId }
 })
 .then(countDislike=>res.status(200).json(countDislike))
 .catch(() => res.status(500).json({ error: "requette impossible"}))
}


