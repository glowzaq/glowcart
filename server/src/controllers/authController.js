import bcrypt from 'bcryptjs'
import validator from 'validator'
import User from '../models/userModel.js'
import generateToken from '../utils/token.js'

const register = async(req, res)=>{
    try {
        const {fullname, email, password} = req.body

        // Validate input fields
        if(!fullname || !email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: 'Invalid email address'})
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain uppercase, lowercase, number, and special character"
            });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: 'Email is already registered'})
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await User.create({
                fullname,
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save()
            const token = generateToken(savedUser)

            return  res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: savedUser._id,
                    fullname: savedUser.fullname,
                    email: savedUser.email,
                    role: savedUser.role
                }
            })
        }
    } catch (error) {
        console.log(error, "Registration error");
        res.status(500).json({message: 'Server error'}) 
    }
}

const login = async(req, res)=>{
    const {email, password} = req.body

    try {
        // Validate input fields
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: 'Invalid email address'})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        const token = generateToken(user)
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error, "Login error");
        res.status(500).json({message: 'Server error'}) 
    }
}

export {register, login}