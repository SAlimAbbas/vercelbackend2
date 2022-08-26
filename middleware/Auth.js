const jsonwebtoken=require("jsonwebtoken")
const Auth=(req,res,next)=>{
   try {

    const TOKEN=req.header("Authorization").split(" ")[1]; //to prevent taking the bearer keyword

    if(!TOKEN){
        return res.status(403).send("token not found");
    }

    try {
        const salting=jsonwebtoken.verify(TOKEN,"SecretSALT8080")
        console.log(salting);

    } catch (error) {
        return res.status(401).send("Invalid Token")
    }
    return next()
   } 
   catch (error) {
   return res.status(400).send("user unauthorized !")
   }
}
module.exports=Auth;