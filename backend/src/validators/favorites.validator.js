import { z } from "zod";

const addFavoriteSchema = z.object({
  tmdb_id: z.number({
    required_error: "O campo tmdb_id é obrigatório",
    invalid_type_error: "O campo tmdb_id deve ser um número"
  })
});

export { addFavoriteSchema };
