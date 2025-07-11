import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_secret:process.env.API_CLOUDINARY_SECRET,
    api_key:process.env.API_KEY_CLOUDINARY,
})



export default cloudinary