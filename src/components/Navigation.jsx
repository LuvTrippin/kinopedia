import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-start py-4">
                    <div className="flex space-x-8 bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-gray-700">
                        <Link
                            to="/"
                            className="relative px-3 py-2 text-white font-medium group"
                        >
                            <span className="relative z-10">Главная</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                        </Link>

                        <Link
                            to="/favorites"
                            className="relative px-3 py-2 text-white font-medium group"
                        >
                            <span className="relative z-10">Избранное</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;