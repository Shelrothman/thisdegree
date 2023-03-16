import {
    useState,
    useContext,
    createContext,
    useEffect
} from 'react';
import { UnlockedCard } from '../models/UnlockedCard';
import { LockedCard } from '../models/LockedCard';
import { Prev } from 'react-bootstrap/esm/PageItem';

// ? cant i do my api request here and then pass the data down to the components that need it?
// ? i think i can do that with the useEffect hook


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
        // round: 0,
    });
    const [shakeInitiated, setShakeInitiated] = useState(false);

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



    /**
     * @function handleWrongInput
     * properties to set that effetively display the input was wrong
     */
    // function handleWrongInput() {
    //     setShakeInitiated(true);
    //     setTimeout(() => {
    //         setShakeInitiated(false);
    //     }, 1000);
    //     return;
    // };



    return (
        <GameContext.Provider value={{
            lockedCards,
            setLockedCards,
            unlockedCards,
            setUnlockedCards,
            globalFormState,
            setGlobalFormState,
            resetFormState,
            shakeInitiated,
            setShakeInitiated,
            // gameState,
            // setGameState,
        }}>
            {children}
        </GameContext.Provider>
    );
}