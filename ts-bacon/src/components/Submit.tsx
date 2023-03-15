/**
 * this to do the setting
 */
import { useGameContext } from '../contexts/GameContext';
import Button from 'react-bootstrap/Button';
// import { UnlockedCard } from '../models/UnlockedCard'; will need this later
import { LockedCard } from '../models/LockedCard';


function Submit() {

    const {
        setLockedCards,
        setUnlockedCards,
        globalFormState,
        resetFormState,
    } = useGameContext() as any;

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // stuff to check the answers...
        //
        // * 4 now just using static values but will but in formData later once i get this visual thing working
        setLockedCards((prevLockedCards: LockedCard[]) => {
            return [...prevLockedCards, new LockedCard(globalFormState.movie, globalFormState.actor)];
        });
        resetFormState();

    }


    return (
        <Button variant="primary" onClick={handleSubmit}>
            Submit
        </Button>
    );
}

export default Submit;