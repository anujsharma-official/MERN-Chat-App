import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "5m", // ✅ Token will expire in 5 minutes
  });

  res.cookie("jwt", token, {
    httpOnly: true,   // XSS protection
    secure: true,     // Send only over HTTPS
    sameSite: "strict", // CSRF protection
    maxAge: 5 * 60 * 1000, // ✅ Cookie also expires in 5 minutes (optional but good)
  });
};

export default createTokenAndSaveCookie;
