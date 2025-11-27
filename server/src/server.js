import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
connectDB()

let PORT = process.env.PORT || 5006
app.listen(PORT , (error)=>{
    if(error){
        console.log("Error connecting to server");
    }else{
        console.log(`Server started successfully on port ${PORT}`);
    }
})