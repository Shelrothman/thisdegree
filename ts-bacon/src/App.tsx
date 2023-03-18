// import { useEffect } from 'react';
import Game from './components/Game';
import { GameContextProvider } from './contexts/GameContext';
// import './styles/App.css';
// import './styles/Scrollbar.css';
import './styles/index.scss'
import BaconHeader from './components/BaconHeader';


function App() {

    return (
        <GameContextProvider>
            <div className="App">
                <BaconHeader />
                <Game />
            </div>
        </GameContextProvider>
    )
}

export default App;
