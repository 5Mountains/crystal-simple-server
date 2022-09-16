import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.sendStatus(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403).json({
          success: false,
          message: "Forbidden.",
        });
      }
      req.user = decoded.username;
      next();
    });
  } catch (error) {
    return res.sendStatus(500).json({ success: false, message: error.message });
  }
  next();
};

export default validateToken;
