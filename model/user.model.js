import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },

        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['student', 'recruiter']
        },
        profile: {
            bio: String,
            skills: [{ type: String }],
            resume: { type: String },
            resumeOriginalName: { type: String },
            // company:{}
            profilePhoto: {
                type: String,
                default: ""
            }


        }
    }, {
        timestamps:true
    }
)


export const User = mongoose.model('User', userSchema)



// collection in mongodb == model in mongoose
// schema == document
