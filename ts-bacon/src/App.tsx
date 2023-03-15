import { useState } from 'react';
import Game from './components/Game';
import { GameContextProvider } from './contexts/GameContext';
import './styles/App.css';
import './styles/Scrollbar.css';
import BaconHeader from './components/BaconHeader';
import Shaken from './Shake';

function App() {
    const [count, setCount] = useState(0)

    return (
        <GameContextProvider>
            <div className="App">
                {/* <h1>TS Degrees of Bacon</h1> */}
                <BaconHeader />
                <Shaken />
                <Game />
            </div>
        </GameContextProvider>
    )
}

export default App
