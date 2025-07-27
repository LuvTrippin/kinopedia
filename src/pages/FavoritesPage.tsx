import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.js";
import useFavorites from "../hooks/useFavorites";
import Preloader from "../components/Preloader.js";
import Navigation from "../components/Navigation.tsx";
import {Movie} from "@/types/movie";

const FavoritesPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[] | null>(null);
    const { isFavorite, toggleFavorite, getFavoriteMovies } = useFavorites();

    useEffect(() => {
        setLoading(true);
        setFavoriteMovies(getFavoriteMovies());
        setLoading(false);
    }, []);

    if (!favoriteMovies) return <div>Вы пока не добавили ни одного фильма</div>;

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