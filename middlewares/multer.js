import multer from 'multer'
import path from 'path'

//SET STORAGE ENGINE
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'application/pdf'){
            cb(null,true)
        } else{
            console.log('Only jpg and png file supported!');
            cb(null,false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


export default upload