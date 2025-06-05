
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/generateToken.js";
let users=[];

export const getAllUsers=(req,res)=>{
    try{
        res.status(200).json(users);
    }
    catch(error){
        console.log("Error in getAllUsers function from auth controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const signup=async (req,res)=>{
    try{
        const { fullName, email, password }=req.body;
        if(!fullName || !email || !password) return res.status(400).json({ message:"All fields are required!" });
        if(password.length<6) return res.status(400).json({ message:"Password length must be atleast 6" });

        const oldUser=users.find(item=>item.email===email);
        if(oldUser) return res.status(400).json({ message:"User Already Exists!" });

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        generateToken(users.length+1,res);

        const newUser={
            id:users.length+1,
            fullName:fullName,
            email:email,
            password:hashedPassword
        }
        users.push(newUser);
        res.status(200).json({ message:"Sign Up Successfull" });
    }
    catch(error){
        console.log("Error in signup function from auth controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message:"Invalid User Credentials!" });
        } 

        const reqUser=users.find(user=>user.email===email);
        if(!reqUser) return res.status(404).json({ message:"User not found!" });

        const isEqual=await bcrypt.compare(password,reqUser.password);
        if(!isEqual){
            return res.status(400).json({ message:"Invalid User Credentials" });
        } 

        generateToken(reqUser.id,res);

        res.status(200).json({ message:"Login Successfull" });
    }
    catch(error){
        console.log("Error in login function from auth controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
        
    }
}

export const logout=(req,res)=>{
    try{
        res.clearCookie("accessToken");
        res.status(200).json({ message:"Logged out successfully!" });
    }
    catch(error){
        console.log("Error in logout function from auth controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}