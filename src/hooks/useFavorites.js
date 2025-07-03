import { useState, useEffect } from "react";

const getMovieEssentials = (movie) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    original_language: movie.original_language,
});

export default function useFavorites() {
    const [favoritesMap, setFavoritesMap] = useState(() => {
        try {
            const saved = localStorage.getItem("favoriteMovies");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    return new Map(parsed);
                }
            }
        } catch (error) {
            console.error("Error parsing favorites from localStorage:", error);
        }
        return new Map();
    });

    useEffect(() => {
        try {
            const serialized = JSON.stringify(Array.from(favoritesMap.entries()));
            localStorage.setItem("favoriteMovies", serialized);
        } catch (error) {
            console.error("Error saving favorites to localStorage:", error);
        }
    }, [favoritesMap]);

    const toggleFavorite = (movie) => {
        setFavoritesMap((prevMap) => {
            const newMap = new Map(prevMap);
            const movieId = movie.id;

            if (newMap.has(movieId)) {
                newMap.delete(movieId);
            } else {
                newMap.set(movieId, getMovieEssentials(movie));
            }

            return newMap;
        });
    };

    const isFavorite = (movieId) => {
        return favoritesMap.has(movieId);
    };

    const getFavoriteMovies = () => {
        return Array.from(favoritesMap.values());
    };

    return {
        favoritesMap,
        toggleFavorite,
        isFavorite,
        getFavoriteMovies
    };
}