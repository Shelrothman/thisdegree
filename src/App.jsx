import './styles/App.css';
import TopNav from './components/TopNav';
import Launcher from './components/Launcher.jsx';
import Scoreboard from './components/Scoreboard';

import { ActorStartProvider } from './contexts/ActorStartContext.jsx';

function App() {

    return (
        <ActorStartProvider>
            <div className="App">
                <TopNav />
                <div className="sample-scoreboard">
                    <h1>This Degrees</h1>
                    <div>
                        <Scoreboard />
                    </div>
                </div>
                <Launcher />
            </div>
        </ActorStartProvider>
    )
}

export default App;
