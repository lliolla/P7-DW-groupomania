// import models in table POSTS
const Model = require('../models');


exports.getAllCmt = (req,res,next)=>{
console.log('getAllCmts');
Model.Comment.findAll({
    attributes :['id', 'content','updatedAt','UserId','PostId'],  
    include: {
        model: Model.User ,
        attributes:['username','media']},
    order: [["id", "DESC"]],
})
.then(cmt=> res.status(200).json(cmt))
.catch(error => res.status(404).json({error : "aucun commentaires pour cette publication" }))
}

exports.getOnePostCmts = (req,res,next)=>{
    console.log('getOneCmts',req.params.id);
    Model.Comment.findAll({
      where : {PostID : req.params.id},
      attributes :['id','content','UserId', 'PostId','updatedAt'],
      include: {
        model: Model.User ,
        attributes:['id','username','media']
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
        'UserId',
        'PostId',
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
    let PostId =req.body.PostId
    let UserId =req.body.UserId

    let updateObject ={content,PostId,UserId }
    console.log('updateCmts back',updateObject);
    
   Model.Comment.update(
    updateObject,
    {where :{id :req.params.id}}
   )
   .then(updateCmt=>res.status(200).json(updateCmt))
   .catch (error => res.status(404).json({ error: "le commentaire n'a pas pu etre mis a jour"}))

    }
exports.createCmt =(req, res,next)=>{
// Test datas comming Frontend and empty field
let content = req.body.content
let PostId =req.body.PostId
let UserId = req.body.UserId
if ( content==null||content <= 0 ){
    return res.status(400).json({ error: "le commentaire ne peut pas etre envoyé vide " });
}
console.log("create comment",PostId,UserId,content);
Model.Post.findOne({
where : {id :PostId}
})
.then(postFound =>{
    if(postFound){
    let newCmt = {content,UserId,PostId}
    console.log("commentaire pret a envoyé en bd",newCmt)
    Model.Comment.create(newCmt)
    .then(newCmt=> res.status(200).json(newCmt) ) 
    .catch(() => res.status(400).json ({error: "impossible de creer le commentaire"})) 
    }else{
        return res.status(409).json({ error: 'aucun post trouvé impossible de créer le commentaire'})
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