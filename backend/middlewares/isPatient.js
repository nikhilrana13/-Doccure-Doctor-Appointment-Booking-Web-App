
export const isPatient = async(req,res,next)=>{
    try {
        // console.log("req.user",req.role);
        if(!req.role ||req.role !== "patient"){
            return res.status(400).json({message:"You are not a patient"});
        }
        next();
    } catch (error) {
        console.log("error in isPatient middleware",error);
        return res.status(500).json({message:"internal server error"}); 
    }
}