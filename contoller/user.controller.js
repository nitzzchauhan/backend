import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js"
import bcrypt from 'bcryptjs'



export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        // ✅ Check if all required fields are provided
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // ✅ Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // 🔐 Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 🧾 Create a new user in the database
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: "" // Default profile photo (can update later)
            }
        });

        // ✅ Send success response
        return res.status(201).json({
            message: "User has been registered successfully",
            success: true
        });

    } catch (error) {
        console.error("Error in register:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    // console.log("login api")
    // console.log(req.body)
    try {
        const { email, role, password } = req.body
        console.log(req.body)
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email password",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email and password",
                success: false
            });
        }        
        // hello
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesnt exist with current role",
                success: false
            });
        }
        const tokenData = {
            userId: user._id,
            userEmail: user.email
        }
        const token = await jwt.sign(tokenData, process.env.secret_key, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        // user = await User.findOne({ email }).select("-password");

        // return res.status(200).json(
        //     {
        //         message: "Login Successful",
        //         success: true,
        //         user: user,
        //         token: token
        //     }
        // )

        return res.status(200).cookie('access_token', `Bearer ${token}`, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  }).json(
            {
                message: "Login Successful",
                success: true,
                user: user,
                token:token
            }
        )

    }
    catch (error) { console.log(error.message) }


}
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token","").json({
            message:"User Logged out successfully",
            success:true
        })
    }
    catch(error){
            console.log(error.message)
    }
}
export const updateProfile = async (req, res) => {
    return res.send("hello from update profile")
}

// three way sby which you will receive your data from frontend

// req.body --> from form
// req.params --> url parameter
// req.query --> www.google.com/q?search=njkvndfkjgndfkjgkjdfnkgdf