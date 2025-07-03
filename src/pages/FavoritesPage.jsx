import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";
import Preloader from "../components/Preloader";

const FavoritesPage = () => {
    const { getFavoriteMovies } = useFavorites();
    const [loading, setLoading] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        setFavoriteMovies(getFavoriteMovies());
    }, []);

    if (loading) return <Preloader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Избранные фильмы</h1>

            {favoriteMovies.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">Вы еще не добавили ни одного фильма в избранное</p>
                    <p className="text-gray-400">Найдите интересные фильмы и добавьте их с помощью ❤️</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoriteMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;