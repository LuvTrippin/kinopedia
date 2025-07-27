import Search from "../components/Search.tsx";
import React, {useEffect, useState} from "react";
import Preloader from "../components/Preloader.tsx";
import MovieCard from "../components/MovieCard.tsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "@/appwrite";
import useFavorites from "../hooks/useFavorites";
import Navigation from "../components/Navigation.tsx";
import {Movie} from "@/types/movie"

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

interface ApiResponse {
    results: Movie[];
    Response?: boolean,
    error?: string,
}

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [movieList, setMovieList] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const { isFavorite, toggleFavorite } = useFavorites();

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setLoading(true);
        setErrorMessage("");

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data: ApiResponse = await response.json();

            if (data.Response === false) {
                setErrorMessage(data.error || "Something went wrong");
                setMovieList([]);
                return;
            }
            setMovieList(data.results);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);


    if (!movieList) return <div>Ошибка при загрузке фильмов</div>;

    return (
        <main className="App">
            <Navigation />
            <div className="pattern" />

            <div className="wrapper">
                <header className="App-header">
                    <img src="./hero.png" alt="banner" />
                    <h1>Здесь ты можешь найти <span className="text-gradient">фильм</span> по душе!</h1>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </header>

                {trendingMovies.length > 0 ? (
                    <section className="trending">
                        <h2>Лучшее</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ): null}

                <section className="all-movies">
                    <h2>Популярное</h2>

                    { loading ? (
                        <Preloader />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
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

export default HomePage
