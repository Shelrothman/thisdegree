import { useState } from 'react';
import Game from './components/Game';
import { GameContextProvider } from './contexts/GameContext';
import './styles/App.css';



function App() {
    const [count, setCount] = useState(0)

    return (
        <GameContextProvider>
            <div className="App">
                <h1>TS Degrees of Bacon</h1>
                <Game />
                <div className="card">
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
            </div>
        </GameContextProvider>
    )
}

export default App
