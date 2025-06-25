import jwt from "jsonwebtoken"

exports.isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request for downstream usage
    req.user = {
      _id: decoded.id,
      email: decoded.email,
      username: decoded.username, // use username consistently
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.isRoomAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ROOM_JWT_SECRET);
    req.room = {
      roomId: decoded.roomId,
      code: decoded.code,
      host: decoded.host,
    };
    next();
  } catch (err) {
    console.error("Room Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid or expired room token" });
  }
};
