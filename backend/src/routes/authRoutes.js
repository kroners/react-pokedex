import { Router } from "express";

const router = Router();

const ADMIN_USER = {
  username: "admin",
  password: "admin"
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const user = {
      username,
      role: "admin"
    };

    return res.json({
      success: true,
      token: "fake-admin-token",
      user
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

export default router;
