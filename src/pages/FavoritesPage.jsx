import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";
import Preloader from "../components/Preloader";
import Navigation from "../components/Navigation.jsx";

const FavoritesPage = () => {
    const { getFavoriteMovies } = useFavorites();
    const [loading, setLoading] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        setFavoriteMovies(getFavoriteMovies());
    }, []);

    return (
        <main className="App">
            <Navigation />
            <div className="pattern" />

            <div className="wrapper">
                <header className="App-header">
                    <img src="./hero.png" alt="banner" />
                    <h1 className="my-12">Избранное</h1>
                </header>

                <section className="all-movies">

                    { loading ? (
                        <Preloader />
                    ) : (
                        <ul>
                            {favoriteMovies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    isFavorite={isFavorite}
                                    toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default FavoritesPage;