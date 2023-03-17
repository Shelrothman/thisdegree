// import { useState } from 'react';
import Game from './components/Game';
import { GameContextProvider } from './contexts/GameContext';
import './styles/App.css';
import './styles/Scrollbar.css';
import BaconHeader from './components/BaconHeader';
// import ShakeIt from './utils/ShakeIt';

// TODO: add a little x in top corner of each card to remove it AND if its removed than all the cards below it should be removed as well
// which should effectively bring back the user to that point in the game


function App() {
    // const [count, setCount] = useState(0)



    console.log('hi')

    return (
        <GameContextProvider>
            <div className="App">
                <BaconHeader />
{/*  HMR is not working now and it was yesterday i didnt do anything with the ifles on windows whatttt */}


                <Game />
            </div>
        </GameContextProvider>
    )
}

export default App
