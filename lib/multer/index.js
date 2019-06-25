const multer  = require('multer');


function uploader (disPath, keyName ) {
 return multer({ storage: multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, disPath)
    },
    filename: function (req, file, cb) {
         let extension = file.mimetype.replace('image/', '')
         let name = req.body[keyName].replace(/ /g, '') + '-' + new Date().getTime() + '.' + extension
      cb(null, name)
    }
  }) 
})
}

exports.uploadForUser = uploader('public/images/users', 'name')
