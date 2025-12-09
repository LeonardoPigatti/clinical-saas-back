import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // usa seu segredo do .env

export interface AuthUser {
  userId: string;
  role: "admin" | "doctor" | "staff";
  companyId?: string;
}

export const getUserFromToken = (req: any): AuthUser | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "").trim();
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log("Token decodificado:", decoded);
    return {
      userId: decoded.userId,
      role: decoded.role,
      companyId: decoded.companyId,
    };
  } catch (err: any) {
    console.log("Erro ao decodificar JWT:", err.message);
    return null;
  }
};
