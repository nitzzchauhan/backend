import express from 'express'
import { login, updateProfile, logout, register } from '../contoller/user.controller.js'


const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile/update").post(updateProfile)
router.route("/logout").get(logout)

export default router