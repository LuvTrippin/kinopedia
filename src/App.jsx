import './App.css'
import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import Preloader from "./components/Preloader.jsx";
import MovieCard from "./components/MovieCard.jsx";

const API_BASE_URL =  "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();

            if (data.Response === false) {
                setErrorMessage(data.error || "Something went wrong");
                setMovieList([]);
                return;
            }
            setMovieList(data.results);
            console.log(data.results);
        } catch (error) {
           setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <main className="App">
            <div className="pattern" />

            <div className="wrapper">
                <header className="App-header">
                    <img src="./hero.png" alt="banner" />
                    <h1>Здесь ты можешь найти <span className="text-gradient">фильм</span> по душе!</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2 className="mt-[42px]">Популярное</h2>

                    { loading ? (
                        <Preloader />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App
