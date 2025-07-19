
export const isDoctor = async(req,res,next)=>{
    try {
        // console.log("req.user",req.role);
        if(!req.role ||req.role !== "doctor"){
            return res.status(400).json({message:"You are not a doctor"});
        }
        next();
    } catch (error) {
        console.log("error in isDoctor middleware",error);
        return res.status(500).json({message:"internal server error"}); 
    }
}