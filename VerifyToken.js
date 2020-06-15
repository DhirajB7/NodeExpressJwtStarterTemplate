const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (token === null) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const userId = JWT.verify(token, process.env.TOKEN_SECRET);
    req.user = userId;
    next();
  } catch (error) {
    console.log(error);
    console.log(token);
    res.status(400).json({ message: "WRONG TOKEN" });
  }
};
