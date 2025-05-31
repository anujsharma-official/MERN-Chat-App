import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "5m", 
  });

  res.cookie("jwt", token, {
    httpOnly: true,   
    secure: true,    
    sameSite: "strict", 
    maxAge: 5 * 60 * 1000, 
  });
};

export default createTokenAndSaveCookie;
