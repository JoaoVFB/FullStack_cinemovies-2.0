// src/validators/auth.validator.js
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter ao menos 6 caracteres" })
});
