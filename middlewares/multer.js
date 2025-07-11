import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".jpg"
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


export const uploadMiddleware = multer({storage}).single("file")





// const upload = multer({dest: 'uploads/'})

// export const uploadMiddleware = upload.single('file')