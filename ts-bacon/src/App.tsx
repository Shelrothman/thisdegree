// import { useEffect } from 'react';
import Game from './components/Game';
import { GameContextProvider } from './contexts/GameContext';
// import './styles/App.css';
// import './styles/Scrollbar.css';
import './styles/index.scss'
import BaconHeader from './components/BaconHeader';
import TopNav from './components/TopNav/Index';
import Start from './components/buttons/Start';
// import { useGameContext } from './contexts/GameContext';

function App() {
    // const { globalGame } = useGameContext() as any;

    return (
        <GameContextProvider>
            <TopNav />
            <div id="App">
                <Start />
                {/* <BaconHeader /> */}
                <Game />
            </div>
        </GameContextProvider>
    )
}

export default App;
