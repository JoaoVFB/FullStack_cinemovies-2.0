
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Token não fornecido" });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Token inválido" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "um_segredo_muito_forte_e_aleatorio_para_jwt");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "Usuário inexistente" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
