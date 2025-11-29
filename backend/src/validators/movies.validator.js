// src/validators/movies.validator.js
import { z } from "zod";

export const searchSchema = z.object({
  q: z
    .string({
      required_error: "O parâmetro 'q' é obrigatório."
    })
    .trim()
    .min(1, "O campo de busca não pode estar vazio."),
});
