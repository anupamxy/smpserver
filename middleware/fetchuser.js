// var jwt= require("jsonwebtoken");
// const JWT_SECRET = "Anupam is a good  boy";
// const fetchuser =(req,res,next)=>{
//     //get user from the jwt token
//     const token=req.header('auth-token');
//     if(!token){
//         res.status(401).send({error:"please authenticate using a valid token"})
//     }
//     const string=jwt.verify(token,"WT_SECRET")
//     req.user=data.user;
//     next();
//     try {
//         const string=jwt.verify(token,"JWT_SECRET")
//         req.user=data.user;
//         next();
//     } catch (error) {
//        res.status(401).send({error:"please enter using a valid token"})
//     }
// }


// module.exports=fetchuser;
var jwt= require("jsonwebtoken");
const JWT_SECRET = "Anupam is a good  boy";

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please enter using a valid token" });
  }
}

module.exports = fetchuser;
