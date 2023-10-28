const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
        // cb(null,path.join(__dirname+'/uploads'));

    },
    filename: function (req, file, cb) {
        console.log('calll')
        // cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        cb(null, new Date().toISOString() + '-' + file.originalname)

    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        //reject file
        cb({message: 'Unsupported file format'}, false)
    }
}

const upload = multer({
    storage: storage, //NOTE Where files are stored
    limits: { fileSize: 1024 * 1024 }, //NOTE // 1 MB (max file size)
    fileFilter: fileFilter //NOTE Filter by image tyoe jpeg and png.
    
}, function(err){ if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    console.log('multer error' + err);
  } else if (err) {
    // An unknown error occurred when uploading.
    console.log('multer error' + err);

  }}
  )
module.exports = upload;


// const multer = require('multer');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });

module.exports = upload;