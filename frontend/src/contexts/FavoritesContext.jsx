import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";


const initialFavoritesState = {
  favorites: [],
  loading: true,
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case "SET_FAVORITES":
      return { favorites: action.payload, loading: false };
    case "ADD_FAVORITE_LOCAL":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE_LOCAL":
      return { ...state, favorites: state.favorites.filter((m) => m.movie.tmdb_id !== action.payload) };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "CLEAR_FAVORITES":
      return { favorites: [], loading: false };
    default:
      return state;
  }
}

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);
  const { user, loading: authLoading } = useAuth();

  // Função para carregar favoritos do backend
  const loadFavorites = useCallback(async (searchTerm = "") => {
    if (!user) {
      dispatch({ type: "CLEAR_FAVORITES" });
      return;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(`/favorites?q=${searchTerm}`);
      dispatch({ type: "SET_FAVORITES", payload: response.data });
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      dispatch({ type: "SET_FAVORITES", payload: [] });
    }
  }, [user]);

  
  useEffect(() => {
    if (!authLoading) {
      loadFavorites();
    }
  }, [user, authLoading, loadFavorites]);

  // Função para adicionar favorito
  const addFavorite = async (tmdb_id) => {
    if (!user) {
      alert("Você precisa estar logado para adicionar favoritos!");
      return;
    }
    try {
      const response = await api.post("/favorites", { tmdb_id });
      
      dispatch({ type: "ADD_FAVORITE_LOCAL", payload: response.data.favorite });
      return true;
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Erro ao adicionar favorito.");
      return false;
    }
  };

  // Função para remover favorito
  const removeFavorite = async (tmdb_id) => {
    if (!user) return;
    try {
      await api.delete(`/favorites/${tmdb_id}`);
   
      dispatch({ type: "REMOVE_FAVORITE_LOCAL", payload: tmdb_id });
      return true;
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      alert("Erro ao remover favorito.");
      return false;
    }
  };

  // Função para verificar se um filme é favorito
  const isFavorite = (tmdb_id) => {
    return state.favorites.some(fav => fav.movie.tmdb_id === tmdb_id);
  };

  return (
    <FavoritesContext.Provider value={{ state, addFavorite, removeFavorite, isFavorite, loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
