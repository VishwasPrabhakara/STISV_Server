const jwt = require("jsonwebtoken");

function bearerToken(req) {
  const authorization = req.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
}

function verifyToken(req, res, next) {
  const token = bearerToken(req);
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function verifyAdminToken(req, res, next) {
  return verifyToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Administrator access required" });
    }

    req.admin = req.user;
    return next();
  });
}

function requireOwner(source = "params", key = "uid") {
  return (req, res, next) => {
    const requestedUid = req[source]?.[key];

    if (!requestedUid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.user?.uid || req.user.uid !== requestedUid) {
      return res.status(403).json({ message: "You cannot access another user's data" });
    }

    return next();
  };
}

module.exports = {
  requireOwner,
  verifyAdminToken,
  verifyToken,
};
