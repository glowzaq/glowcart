import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, 'Fullname is required'],
            trim: true,
            minlength: [3,  'Fullname must be at least 3 characters long']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
            validate: {
                validator: function(v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }       
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
}
)

export default mongoose.model('User', userSchema)