import './App.css'
import FavoritesPage from './pages/FavoritesPage.js';
import HomePage from './pages/HomePage.js';
import MoviePage from './pages/MoviePage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="movie/:id" element={<MoviePage />} />
                <Route path="favorites" element={<FavoritesPage />} />
            </Routes>
        </Router>
    )
};

export default App
