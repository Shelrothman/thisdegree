import {
    useState,
    useContext,
    createContext,
    useEffect
} from 'react';
import { UnlockedCard } from '../models/UnlockedCard';
import { LockedCard } from '../models/LockedCard';


const GameContext = createContext({});

export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }: { children: any }) {

    /** States */
    const [lockedCards, setLockedCards] = useState<LockedCard[]>([]);

    const [unlockedCards, setUnlockedCards] = useState<UnlockedCard[]>([]);

    const [globalFormState, setGlobalFormState] = useState({
        actor: '',
        movie: '',
    });

    /** Effects */
    useEffect(() => {
        console.log('current lockedCards: ');
        console.table(lockedCards);
    }, [lockedCards]);

    useEffect(() => {
        console.log('current unlockedCards: ');
        console.table(unlockedCards);
    }, [unlockedCards]);

    
    /** Handlers/Functions */
    function resetFormState() {
        setGlobalFormState({
            actor: '',
            movie: '',
        });
    }


    return (
        <GameContext.Provider value={{
            lockedCards,
            setLockedCards,
            unlockedCards,
            setUnlockedCards,
            globalFormState,
            setGlobalFormState,
            resetFormState
        }}>
            {children}
        </GameContext.Provider>
    );
}