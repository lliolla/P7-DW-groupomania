// import models in table USER

const Model = require('../models');


exports.getAllUsers =(req,res,next)=>{
   Model.User.findAll({ 
     attributes :['id', 'email','username','avatar'],// on precise les attributs que l'on veux recup)
   })
   .then(getAllUsers=> res.status(200).json(getAllUsers))
   .catch(error => res.status(404).json({error: "aucun utilisateur trouvé" }))
}

exports.displayUser= (req,res, next) =>{
  // voir pour gerer le userid du token null quand on a pas le bon id
  console.log("displayUser",req.params);
     Model.User.findOne({
       //attributes :['id', 'email','username','avatar'],// on precise les attributs que l'on veux recup
       where : {id : req.params.id}
    })
    .then(displayUser=> res.status(200).json( displayUser ))// on affiche l'utilisateur
    .catch ((error)=> res.status(404).json( { error: "aucun utilisateur trouvé pour cet id"} ))
  }

exports.delateUser= (req,res, next) =>{
  const bearerHeader = req.headers['authorization']
    const userID = req.params.id;
    console.log("DelateUser",userID,bearerHeader);
     Model.User.destroy({
       where : {id : userID}
     })
     .then(delateUser=> res.status(200).json( {message : 'profil supprimé avec succes'} ))// on affiche l'utilisateur
     .catch ((error)=> res.status(404).json( { error: "aucun utilisateur trouvé pour cet id"} ))
   
  };
  
exports.updateUser= (req,res, next) =>{

  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email= req.body.email;
  let idUsers=req.body.idUsers
  let avatar =(req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:req.body.avatar);
  let userObject = { username,firstname,lastname,email,avatar}
  console.log("userObject",avatar,idUsers);
     Model.User.update(userObject, {where : {id :idUsers} })
      .then(updateUser => res.status(200).json(updateUser))
      .catch(error => res.status(404).json({ error: "le profil n'a pas pu etre mis a jour"}))
  };
 

 
