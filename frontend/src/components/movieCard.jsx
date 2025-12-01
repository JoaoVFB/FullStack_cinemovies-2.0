import './movieCard.css';
import { useState } from 'react';
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

function MovieCard({ movie }) {
   const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
   const isFav = isFavorite(movie.id);

   const toggleFavorite = (e) => {
    e.stopPropagation(); 

    if (!user) {
      alert("Você precisa estar logado para adicionar favoritos!");
      return;
    }

    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie.id);
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-overlay">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.rating.toFixed(1)}</p>
        <p className="year">{movie.year}</p>
        <button
        onClick={toggleFavorite}
        className={`fav-btn ${isFav ? "active" : ""}`}
      >
        {isFav ? "❤️ Remover" : "🤍 Favoritar"}
      </button>
      </div>
    </div>
  );
}

export default MovieCard;
