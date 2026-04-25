const jwt= require("jsonwebtoken");

function checkAuthentication(req, res, next){
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
        return res.status(401).json({
            message: "unauthorized",
            detail: "Missing or invalid Authorization header. Use: Bearer <token>",
        });
    }
    const token= authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "unauthorized", detail: "Token missing" });
    }
    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            message: "unauthorized",
            detail: error.message || "Invalid or expired token",
        });
    }
}

const checkAdmin= (req, res, next)=>{
    if(!req.user || !req.user.role){
        return res.status(401).json({message: "User information not found"});
    }
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "Forbidden - Admin access required"});
    }
    next();
}



const restrictAdmin= (req, res, next)=>{
    if(req.user && req.user.role==="admin") 
    {
        return res.status(403).json({
            message: "admin is not allowed to access this route"
        });
    }
    next();
}

const restrictAdminUser= (req, res, next)=>{
    if(req.user) 
    {
        return res.status(403).json({
            message: "admin and user is not allowed to access this route"
        });
    }
    next();
}
module.exports={checkAuthentication, checkAdmin, restrictAdmin, restrictAdminUser};