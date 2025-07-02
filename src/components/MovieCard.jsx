import React from 'react';
import {Link} from "react-router-dom";


const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const MovieCard = ({ movie: { title, poster_path, vote_average, release_date, original_language, id } }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);

    return (
        <div className="movie-card">
            <Link className="relative" to={`/movie/${id}`}>
            <img src={poster_path ? `${IMAGE_BASE_URL}${poster_path}` : '/no-movie.png'} alt={title} />
            </Link>

            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="content-main">
                        <div className="rating">
                            <img src="star.svg" alt="star" />
                            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                        </div>
                        <span>•</span>
                        <p className="lang">{original_language}</p>
                        <span>•</span>
                        <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
                    </div>

                    <p
                        className="add-to-fav"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {isFavorite ? '❤️': '🤍'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;