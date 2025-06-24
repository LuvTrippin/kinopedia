import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ( { title }) => {
    const [count, setCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        console.log("state changed !", hasLiked);
    }, [hasLiked]);

    return (
        <div className="card" onClick={ () => setCount(count + 1) }>
            <h2>{ title }</h2>

            <button onClick={() => setHasLiked(!hasLiked)}>{hasLiked ? "❤️" : "🩶"}</button>
        </div>
    );
}

const App = () => {

    return (
        <div className="card-container">
            <Card title={"Matrix"} />
            <Card title={"Blade"} />
            <Card title={"Up!"} />
        </div>
    );
};

export default App
