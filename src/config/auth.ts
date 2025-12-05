import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthUser {
  userId: string;
  companyId: string;
  role: string;
}

// `req` é any no Apollo Server standalone
export function getUserFromToken(req: any): AuthUser | null {
  const authHeader = req.headers?.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (err) {
    return null;
  }
}
