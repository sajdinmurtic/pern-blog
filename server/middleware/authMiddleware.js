const jwt = require('jsonwebtoken')


const auth = async (req, res,next) => {
  let token

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
   ) {
    try {
      
      token = req.headers.authorization.split(' ')[1]

      
      const decoded = jwt.verify(token, process.env.jwtsecret)

      
      req.user = decoded.user

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json('Not authorized')
      
    }
   }

  if(!token) {
    res.status(401).json('No token')
    
  }
}
module.exports={
    auth
}