import jwt from "jsonwebtoken";

class AuthMiddleware {
  async isAuthenticated(req, res, next) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          message: "User not authenticated",
          success: false,
        });
      }
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
      if (!decode) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }
      req.id = decode.userId;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }
}

export default new AuthMiddleware().isAuthenticated;