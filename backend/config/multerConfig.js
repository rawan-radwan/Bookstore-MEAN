// // to post images in the request
const multer = require('multer');
// const storage = multer.diskStorage({
//     // where to save files
//     destination: (req, res, cb)=>{
//         cb(null, 'uploads');
//     },
//     // how to save file name
//     filename: (req, file, cb)=>{
//         cb(null, Date.now() + '_' + file.originalname);     // to make sure the name will not be repeated
//     }
// });
// const upload = multer({storage});

// module.exports = upload;



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}-${file.originalname}`);
    }
});

const multerConfig = multer({ storage: storage });

module.exports = multerConfig;

