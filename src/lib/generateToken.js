import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken=async (userId,res)=>{
    try{
        const accessToken=jwt.sign({ userId },process.env.JWT_SECRET,{ expiresIn:'7d' });
        res.cookie("accessToken",accessToken,{
            maxAge:7*24*60*60*100,
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })
    }
    catch(error){
        console.log("Error in generateToken function from lib", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}