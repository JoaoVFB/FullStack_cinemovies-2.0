// src/models/Favorite.js
import mongoose from "mongoose";

const MovieInfoSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true },
  title: { type: String, required: true },
  overview: { type: String },
  poster_path: { type: String },
  release_date: { type: String }
}, { _id: false });

const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

  movie: { 
    type: MovieInfoSchema,
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

// Impede duplicação
FavoriteSchema.index({ user: 1, "movie.tmdb_id": 1 }, { unique: true });

export default mongoose.model("Favorite", FavoriteSchema);
