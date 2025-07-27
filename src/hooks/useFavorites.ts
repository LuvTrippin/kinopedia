import {useState, useEffect, useCallback} from "react";
import {Movie} from "@/types/movie.js"


interface MovieEssentials {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string | null;
    original_language: string;
}

interface UseFavoritesReturn {
    favoritesMap: Map<number, MovieEssentials>,
    isFavorite: (movieId: number) => boolean,
    toggleFavorite: (movie: Movie) => void,
    getFavoriteMovies: () => MovieEssentials[],
}

const getMovieEssentials = (movie: Movie): MovieEssentials => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    original_language: movie.original_language,
});

export default function useFavorites(): UseFavoritesReturn {
    const [favoritesMap, setFavoritesMap] = useState<Map<number, MovieEssentials>>(() => {
        try {
            const saved = localStorage.getItem("favoriteMovies");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    return new Map(parsed as [number, MovieEssentials][]);
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

    const toggleFavorite = useCallback((movie: Movie) => {
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
    }, []);

    const isFavorite = useCallback((movieId: number): boolean => {
        return favoritesMap.has(movieId);
    }, [favoritesMap]);

    const getFavoriteMovies = useCallback((): MovieEssentials[] => {
        return Array.from(favoritesMap.values());
    }, [favoritesMap]);

    return {
        favoritesMap,
        toggleFavorite,
        isFavorite,
        getFavoriteMovies
    };
}