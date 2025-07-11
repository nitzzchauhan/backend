import express from 'express'
import { login, updateProfile, logout, register } from '../contoller/user.controller.js'
import { uploadMiddleware } from '../middlewares/multer.js'


const router = express.Router()

router.route("/register").post(uploadMiddleware, register)
router.route("/login").post(login)
router.route("/profile/update").post(updateProfile)
router.route("/logout").get(logout)

export default router