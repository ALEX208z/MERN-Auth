import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // 1. Get token from cookie
  const {token} = req.cookies;

  // 2. If no token -> stop here, don't let them through
  if (!token) {
    return res.json({success: false, message: "Not Authorized. Login Again"});
  }

  try {
    // 3. Verify token is valid and not expired
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach userId to req so controllers can use it
    if (tokenDecode.id) {
      // req.body.userId = tokenDecode.id;   // req.body may be undefined
      req.userId = tokenDecode.id;   // attach to req directly
     } else {
      return res.json({success: false, message: "Not Authorized. Login Again"});
     }

     // 5. All good -> pass to the actual controller
     next();
    
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

export default userAuth;