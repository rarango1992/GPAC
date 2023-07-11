const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    const response = {
        data: {},
        msg: "A token is required for authentication.",
        code: 2,
        token: token
      };
    return res.status(403).send(response);
  }
  try {
    jwt.verify(token, config.TOKEN_KEY);
  } catch (err) {
    const response = {
        data: {},
        msg: "Invalid Token.",
        code: 2,
        token: token
      };
    return res.status(401).send(response);
  }
  return next();
};

module.exports = verifyToken;