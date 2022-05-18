const multer = require('multer') // on import multer
//create dictonary of minetype
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
  };
// on creer l'objet de configuration de multer
//on spécifie le dossier de stockage pour les images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
    }, 
      //on definit le nomage des fichier images que l'on recupere
      filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
      }
});
//on export multer et on precise la methode single pour ne gerer qu'une image a la fois
module.exports= multer({storage}).single('media');