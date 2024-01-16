const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token is missing. Authorization header not found." });
  }

  const token = authorizationHeader.split(" ")[1];
  
  if (token) {
    jwt.verify(token, "XYZ", (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Error while verifying token." });
      }
      
      req.user = data.user;
      next();
    });
  } else {
    res.status(401).json({
      message: "Token is missing or invalid."
    });
  }
};

module.exports = auth;
