// src/routes/favorites.routes.js
import { Router } from "express";
import axios from "axios";
import Favorite from "../models/Favorite.js";
import { auth } from "../middleware/auth.middleware.js";
import { addFavoriteSchema } from "../validators/favorites.validator.js";

const router = Router();

// Helper: escape regex
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// POST /api/favorites
router.post("/", auth, async (req, res) => {
  console.log("========== TESTE FAVORITES ==========");
  console.log("BODY RECEBIDO:", req.body);

  try {
    // 1. Validação com Zod
    const parsed = addFavoriteSchema.safeParse(req.body);
    console.log("RESULTADO DO ZOD:", parsed);

    if (!parsed.success) {
      console.log("ERROS DO ZOD:", parsed.error.errors);
      return res.status(400).json({
        error: parsed.error.errors[0].message
      });
    }

    const { tmdb_id } = parsed.data;

    // 2. Verificar se já existe
    const exists = await Favorite.findOne({
      user: req.user._id,
      "movie.tmdb_id": tmdb_id
    });

    if (exists) {
      return res.status(400).json({ error: "Este filme já está nos favoritos." });
    }

    // 3. Buscar detalhes no TMDB
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`;

    const response = await axios.get(tmdbUrl);
    const movieData = response.data;

    // 4. Criar o favorito
    const favorite = await Favorite.create({
      user: req.user._id,
      movie: {
        tmdb_id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        poster_path: movieData.poster_path,
        release_date: movieData.release_date
      }
    });

    return res.status(201).json({
      message: "Filme adicionado aos favoritos!",
      favorite
    });

  } catch (err) {
  console.log("===== ERRO INTERNO FAVORITES =====");
  console.log(err);
  return res.status(500).json({ error: err.message });
}

});



// GET /api/favorites?q=...
router.get("/", auth, async (req, res) => {
  const q = req.query.q?.trim();
  const filter = { user: req.user._id };
  if (q) {
    const regex = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ "movie.title": regex }, { "movie.overview": regex }];
  }
  const list = await Favorite.find(filter).sort({ createdAt: -1 }).lean();
  return res.json(list);
});

// DELETE /api/favorites/:tmdb_id
router.delete("/:tmdb_id", auth, async (req, res) => {
  const tmdbId = Number(req.params.tmdb_id);
  if (Number.isNaN(tmdbId)) {
    return res.status(400).json({ error: "tmdb_id inválido" });
  }
  const deleted = await Favorite.findOneAndDelete({ user: req.user._id, "movie.tmdb_id": tmdbId });
  if (!deleted) return res.status(404).json({ error: "Favorito não encontrado" });
  return res.json({ message: "Favorito removido", deleted });
});

export default router;
