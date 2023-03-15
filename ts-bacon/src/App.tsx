import { useState } from 'react';
import Game from './components/Game';
import { GameContextProvider } from './contexts/GameContext';
import './styles/App.css';
import './styles/Scrollbar.css';
import BaconHeader from './components/BaconHeader';


function App() {
    const [count, setCount] = useState(0)

    return (
        <GameContextProvider>
            <div className="App">
                {/* <h1>TS Degrees of Bacon</h1> */}
                <BaconHeader />
                <Game />
            </div>
        </GameContextProvider>
    )
}

export default App
