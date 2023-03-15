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

    const [lockedCards, setLockedCards] = useState<LockedCard[]>([]);

    const [unlockedCards, setUnlockedCards] = useState<UnlockedCard[]>([]);

    useEffect(() => {
        console.log('current lockedCards: ', lockedCards);
    }, [lockedCards]);

    useEffect(() => {
        console.log('current unlockedCards: ', unlockedCards);
    }, [unlockedCards]);




    return (
        <GameContext.Provider value={{
            lockedCards,
            setLockedCards,
            unlockedCards,
            setUnlockedCards,
        }}>
            {children}
        </GameContext.Provider>
    );
}