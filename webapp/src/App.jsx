import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './styles/App.css';
import TopNav from './components/TopNav';
import Launcher from './components/Launcher.jsx';

import { ActorContextProvider, ThemeContextProvider, GameContextProvider } from './contexts';

import CreateTree from './components/CreateTree';
import TreeList from './components/TreeList';


function App() {

    useEffect(() => {
        console.log('---------');
        console.log('***-App Render');
    })

    useEffect(() => {
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
                        <Routes>
                            <Route path='/' element={<Launcher />} /> 
                            <Route path='/treehome' element={<TreeList />} />
                            <Route path='/createTree' element={<CreateTree />} />
                            <Route path='/account' element={<h1>Account</h1>} />
                            <Route path='/logout' element={<h1>Click to log back in</h1>} />
                            <Route path='*' element={<h1>404 - Not Found</h1>} /> 
                        </Routes>
                        {/* <p>a footer at the bttom would always be here</p> */}
                    </div>
                </GameContextProvider>
            </ActorContextProvider>
        </ThemeContextProvider>
    )
}

export default App;
