import { useEffect } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useState } from "react";
import MovieCard from "./MovieCard";
import "./favoritesPage.css";
import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

function FavoritesPage() {
  const { state, loadFavorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Chama loadFavorites com o termo de busca
    loadFavorites(searchTerm);
  }, [loadFavorites, searchTerm]);

  return (
    <div>
      <Header />
      <div className="favorites-page">

        <h2>Meus Favoritos</h2>
        <div className="search-container">

          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="favorites-search-input"
          />
        </div>
        {state.loading ? (
          <p>Carregando favoritos...</p>
        ) : state.favorites.length === 0 ? (
          <p>Nenhum filme favorito ainda 😢</p>
        ) : (
          <div className="favorites-grid">
            {state.favorites.map((fav) => (
              <MovieCard key={fav.movie.tmdb_id} movie={{
                ...fav.movie, id: fav.movie.tmdb_id, poster: `https://image.tmdb.org/t/p/w500${fav.movie.poster_path}`, rating: fav.movie.vote_average || 0,
                year: fav.movie.release_date
                  ? new Date(fav.movie.release_date).getFullYear()
                  : "----"
              }}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>

  );
}

export default FavoritesPage;
