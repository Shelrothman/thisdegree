import { useEffect } from 'react';

import './styles/App.css';
import TopNav from './components/TopNav';
import Launcher from './components/Launcher.jsx';
import PlayBoard from './components/Scoreboard';

import { ActorContextProvider, ThemeContextProvider, GameContextProvider } from './contexts';

import CreateTree from './components/CreateTree';
import TreeList from './components/TreeList';


function App() {

    useEffect(() => {
        console.log('---------');
        console.log('***-App Render');
    })

    useEffect(()=> {
        console.log('---------');
        console.log('___-App mount.')
    }, []);

    // TODO: merge actor in to gameContext so that we can just use one

    return (
        <ThemeContextProvider>
            <ActorContextProvider>
                <GameContextProvider>
                    <div className="App">
                        <TopNav />
                        {/* <Launcher />
                        <div className="sample-scoreboard">
                            <h1>This Degrees</h1>
                            <div>
                                <PlayBoard />
                            </div>
                        </div> */}
                        <CreateTree />
                    </div>
                </GameContextProvider>
            </ActorContextProvider>
        </ThemeContextProvider>
    )
}

export default App;
