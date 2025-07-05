import './App.css'
import FavoritesPage from './pages/FavoritesPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MoviePage from './pages/MoviePage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
    return (
        <Router basename="/kinopedia">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="movie/:id" element={<MoviePage />} />
                <Route path="favorites" element={<FavoritesPage />} />
            </Routes>
        </Router>
    )
};

export default App
