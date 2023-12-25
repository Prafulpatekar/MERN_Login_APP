import jwt  from "jsonwebtoken";
const key = process.env.ACCESS_TOKEN_SECRET || '__very_secret_key';

export const validateUser = async(req,res,next)=>{
    try{
        let token;
        const authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = await authHeader.split(" ")[1];
            jwt.verify(token,key,(err,decoded)=>{
                if(err){
                    res.status(401).send({err});
                };
                req.user = decoded.user;
                req.token = token;
                next();
            });
            if(!token){
                return res.status(401).send({
                    error: "Unauthorized forbidden"
                });
            };
        }else{
            return res.status(401).send({
                error: "Unauthorized forbidden"
            });
        };
    }catch(error){
        return res.status(500).send({error:error?.message});
    };
};

export const localVariables = async(req,res,next)=>{
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
};