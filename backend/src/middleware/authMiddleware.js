const EXPECTED_TOKEN = "fake-admin-token";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme === "Bearer" && token === EXPECTED_TOKEN) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
}
