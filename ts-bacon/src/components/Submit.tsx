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
        lockedCards,
        setUnlockedCards,
        globalFormState,
        resetFormState,
    } = useGameContext() as any;

    // ! yo remember we dont need to check actor bc it comes from a list
    /** @function checkInputValidity just checks validity of input not validity of result of the input */
    const checkInputValidity = (movieInput: string): boolean => {
        if (movieInput === '') return false; 
        lockedCards.map((lockedCard: LockedCard) => {
            if (lockedCard.movie === movieInput) return false;
        });
        return true;
    };


    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // if notvalid or not in blblbl... then handleWrongMovieInput.. red shake etc...
        if (!checkInputValidity(globalFormState.movie)) {
            console.log('wrong input');
            // handleWrongInput();
            return;
        }
        
        // stuff to check the answers...
        //
        // * 4 now just using static values but will but in formData later once i get this visual thing working
        setLockedCards((prevLockedCards: LockedCard[]) => {
            return [...prevLockedCards, new LockedCard(globalFormState.movie, globalFormState.actor)];
        });
        resetFormState();
        // const scrollTo = document.getElementById('unlocked-cards-div');
        //? its already doing the visual we want; appearing the locked 
        // scrollTo?.scrollIntoView({ behavior: 'smooth' });
    }


    return (
        <Button variant="primary" onClick={handleSubmit}>
            Submit
        </Button>
    );
}

export default Submit;