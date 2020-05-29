//This middleware basically checks if the incoming request is
//verified by the token we've set for the user

const jwt =  require('jsonwebtoken');

module.exports = (req, res, next)=>{
  try{
    const incomingToken = req.headers.authorization.split(" ")[1];
    jwt.verify(incomingToken, "my_token_secret_for_development");
    next();
  }catch(error){
    res.status(401).json({
      message:"Failed"
    })
  }

};
