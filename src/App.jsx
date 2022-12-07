import { useEffect } from 'react';

import './styles/App.css';
import TopNav from './components/TopNav';
import Launcher from './components/Launcher.jsx';
import PlayBoard from './components/Scoreboard';

import { ActorContextProvider, ThemeContextProvider, GameContextProvider } from './contexts';
// from './contexts/ActorContext.jsx';
// import { ThemeContextProvider } from './contexts/ThemeContext.jsx';



function App() {

    useEffect(() => {
        console.log('---------');
        console.log('***-App Render');
    })

    useEffect(()=> {
        console.log('---------');
        console.log('___-App mount.')
    }, []);

    return (
        <ThemeContextProvider>
            <ActorContextProvider>
                <GameContextProvider>
                    <div className="App">
                        <TopNav />
                        <Launcher />
                        <div className="sample-scoreboard">
                            <h1>This Degrees</h1>
                            <div>
                                <PlayBoard />
                            </div>
                        </div>
                    </div>
                </GameContextProvider>
            </ActorContextProvider>
        </ThemeContextProvider>
    )
}

export default App;
