import React, {useEffect, useState} from "react";
import Preloader from "../components/Preloader.jsx";
import {useParams} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const MoviePage = () => {
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchMovie = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS)

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();

            if (data.Response === false) {
                setErrorMessage(data.error || "Something went wrong");
                setMovie({});
                return;
            }
            setMovie(data);

        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovie();
    }, [id]);

    return (
        <main className="Movie">
            <Navigation />
            <div className="pattern" />

            <div className="wrapper">
                <header className="App-header">
                    <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/no-movie.png'} alt={movie.title} className="rounded-2xl max-w-sm" />
                    <h1 className="mt-10"><span className="text-gradient">{movie.title}</span></h1>
                </header>

                { loading ? (
                    <Preloader />
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <section className="movie-info">
                        <div className="movie-description">
                            <h2>О фильме</h2>
                            { movie.origin_country
                                ? <p><span className="sub-title">Страна:</span> {movie.origin_country?.map(country => country).join('•')}</p> : null
                            }
                            { movie.release_date
                                ? <p className="year"><span className="sub-title">Год выхода:</span> {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
                                : null
                            }
                            { movie.vote_average
                                ? <div className="rating-in-full-view">
                                    <p><span className="sub-title">Рейтинг:</span> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                                    <img src="/star.svg" alt="star" />
                                  </div>
                                : null
                            }
                            { movie.genres?.length > 0
                                ? <p><span className="sub-title">Жанры:</span> {movie.genres?.map(genre => genre.name).join('•')}</p>
                                : null
                            }
                            { movie.overview
                                ? <p><span className="sub-title">Описание:</span> {movie.overview}</p>
                                : null
                            }
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default MoviePage;
