import './styles/App.css';
import TopNav from './components/TopNav';
import Launcher from './components/Launcher.jsx';
import Scoreboard from './components/Scoreboard';

import { ActorContextProvider, ThemeContextProvider, GameContextProvider } from './contexts';
// from './contexts/ActorContext.jsx';
// import { ThemeContextProvider } from './contexts/ThemeContext.jsx';



function App() {

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
                                <Scoreboard />
                            </div>
                        </div>
                    </div>
                </GameContextProvider>
            </ActorContextProvider>
        </ThemeContextProvider>
    )
}

export default App;
