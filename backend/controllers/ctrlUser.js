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
  console.log("display",req.params);
     Model.User.findOne({
       attributes :['id', 'email','username','avatar'],// on precise les attributs que l'on veux recup
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
  const userID = req.params.id;

  //verify if user change image in his profil.  or copie req.body
   const userObject  = req.file?
   {
     ...JSON.parse(userObject),
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

   }:{...req.body};
   
  console.log("UpdateUser",userID, userObject);
     Model.User.update(userObject, {where : {id :userID} })
      .then(updateUser => res.status(200).json({message : 'profil modifié avec succes'}))
      .catch(error => res.status(404).json({ error: "aucun utilisateur trouvé pour cet id"}))
  };
 

 
