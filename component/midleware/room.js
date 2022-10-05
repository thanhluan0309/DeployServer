const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(402).json({ success: false, message: "token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.Accestoken);
    req.UserExit = decoded.UserExit;
    next();
  } catch (Err) {
    console.log(Err);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
