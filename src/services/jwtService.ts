import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const secretKey = "prem@serfg6";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };

    const token = jwt.sign(payload, secretKey);
    return token;
  }
}

export default JWTService;
