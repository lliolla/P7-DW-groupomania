// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");



exports.createPost = (req,res,next)=>{   

// on test les données du front
let title = req.body.title;
let content = req.body.content;

////test empty field
if (title == null ||title <= 0 || content==null||content <= 0 ){
  return res.status(400).json({ error: " un champ obligatoire est vide " });
}
// verify length 's text
if(title.length >=50 || title.length <= 2 ){
  return res.status(400).json({ error: "Votre titre doit contenir entre 3 et 50 lettres " }); 
}

// // verify length 's content
if(content.length <=2 ||content.length >= 500 ){
  return res.status(400).json({ error: "Votre contenu doit contenir entre 3 et 500 lettres "}); 
}

// find user who send message 
const token = req.headers.authorization.split(' ')[1];
const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
const userId = decodedToken.userId;

//create message with his ID
  Model.User.findOne({
    attributes :['id','username'],
    where :{ id :userId} })
  .then(userfound =>{
    if(userfound){
      let id_users = userfound.id
      // on test le fichier image , si null on en met un par defaut
     // let img = "https://i.picsum.photos/id/1002/4312/2868.jpg?hmac=5LlLE-NY9oMnmIQp7ms6IfdvSUQOzP_O3DPMWmyNxwo"// on definit une image par defaut voir sinon image nulle
      
    
     let media = (req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null);
      
      let newPost ={title ,content ,media , id_users};
      console.log("post pret a envoyé en bd",newPost)
      Model.Post.create(newPost)
      .then(newPost=> res.status(200).json( {message:"post publié"}))
      .catch(error => res.status(400).json ({error: 'impossible de créer le post'}))
    }else{
      return res.status(409).json({ error: 'aucun utilisateur correspondant au token dans la bd'})
    }
  })
  .catch(error => res.status(500).json({ error: "requette impossible"}))
}

//limite le nombre de post en faisant une pagination
// on recupere tous les posts de tous les users
exports.getAllPosts = (req,res,next)=>{
    console.log('getAllPosts');
    Model.Post.findAll({ 
        attributes :['id', 'title','content','like', 'id_users', 'media','updatedAt'],// on precise les attributs que l'on veux recup)
        include: [ Model.User] ,
        limit: 10,    
        order: [["id", "DESC"]],
    
      },)
      .then(post=> res.status(200).json(post))
      .catch(error => res.status(404).json({error : "aucun post trouvé" }))
}
// on recupere tous les posts d'un user

exports.getOnePost = (req,res,next)=>{
    Model.Post.findOne({
        attributes :['id', 'title','content','like', 'id_users', 'media'],// on precise les attributs que l'on veux recup
        where : {id : req.params.id}
     })
     .then(displayPost=> res.status(200).json(displayPost ))// on affiche l'utilisateur
     .catch ((error)=> res.status(404).json( { error: "aucun post trouvé pour cet id"} ))
}

exports.updatePost = (req,res,next)=>{
   let title = req.body.title;
   let content = req.body.content;
   let media =(req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:req.body.media);
   let updateObject = { title,content,media}
       Model.Post.update(updateObject , {where : {id : req.params.id} })
            .then(updatePost => res.status(200).json(updatePost))
            .catch(error => res.status(404).json({ error: "aucun utilisateur trouvé pour cet id"}))
}

exports.delatePost = (req,res,next)=>{
    const userID = req.params.id;
    const postID = req.body.id
  
    console.log('delatePost',userID,postID);
    Model.Post.destroy({
      where : {id : userID}
    })
    .then(()=> res.status(200).json({message :"post supprimé"}))// on affiche l'utilisateur
    .catch ((error)=> res.status(404).json( { error: "aucun utilisateur trouvé pour cet id"} ))
}
 //recuperer tous les posts d'un user et les com qui lui sont attachés
exports.getOneUserPosts = (req,res,next)=>{
  console.log('getOneUserPosts',req.body,req.params.id);
  // voir pour tester si il y des articles a afficher
  Model.Post.findAll({
 // attributes :['id', 'title','content','like', 'id_users', 'media','updatedAt'],// on precise les attributs que l'on veux recup)
  include: [ Model.User] ,
  where : {id_users : req.params.id},
  order: [["id", "DESC"]],

  }).then(userPosts => res.status(200).json( userPosts ))
    .catch((error)=>res.status(404).json({error: "aucun posts trouvé pour cet utilisateur"}))
}
 