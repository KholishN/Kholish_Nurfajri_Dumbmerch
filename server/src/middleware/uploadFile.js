const multer =  require("multer")


exports.uploadFile = (imageFile) => {
    
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) =>{
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g,""));
        }
    })

    // filter
    const fileFilter = (req, file, cb) =>{
        if(file.fieldname === imageFile){
            if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
                req.fileValidationError = {
                    message: "Only image file are allowed"
                }

            return cb(new Error("Only image file are allowed"), false)
            }
        }
        cb (null, true)
    }

    // ukuran
    const size = 5;
    const maxSize = size * 1000 * 1000;


    const upload = multer({
        storage,
        fileFilter,
        limits:{
            fileSize: maxSize
        },

    }).single(imageFile);

    return (req, res, next) => {
        upload(req, res, (err) => {

            if(req.fileValidationError){
                return res.send(req.fileValidationError)
            }

            if(!req.file && !err){
                return res.send({
                    message: "Please selecet file upload!"
                })
            }

            if(err){
                if(err.code == "LIMIT_FILE_SIZE"){
                    return res.send({
                        message: "Max file size 5 MB"
                    })
                }
                return res.send(err)
            }

            return next()
        })
    }

};