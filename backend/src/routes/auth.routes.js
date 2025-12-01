
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { loginSchema } from "../validators/auth.validator.js";

const router = Router();


router.post("/login", async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.errors.map(e => e.message).join(", ") });
  }
  const { email, password } = parse.data;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "um_segredo_muito_forte_e_aleatorio_para_jwt", {
    expiresIn: process.env.JWT_EXPIRES_IN || "2h"
  });

  return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});

export default router;
