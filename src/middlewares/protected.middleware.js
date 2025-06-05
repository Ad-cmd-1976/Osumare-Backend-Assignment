export const protectedRoute=(req,res,next)=>{
    try{
        const { accessToken }=req.cookies;
        if(!accessToken) return res.status(400).json({ message:"Access Token Required" });
        next();
    }
    catch(error){
        console.log("Error in protected middleware",error.message);
        res.status(500).json({ message:"Internal Server Error" });
    }
}