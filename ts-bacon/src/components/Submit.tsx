/**
 * this to do the setting
 */
import { useGameContext } from '../contexts/GameContext';
import Button from 'react-bootstrap/Button';
// import { UnlockedCard } from '../models/UnlockedCard'; will need this later
import { LockedCard } from '../models/LockedCard';
// import { AiFillDownCircle } from 'react-icons/ai';

// TODO unactivate submit button if no input
// TODO unactivate all form elements while shaking


function Submit() {

    const {
        setLockedCards,
        lockedCards,
        // setUnlockedCards,
        globalFormState,
        resetFormState,
        shakeInitiated,
        setShakeInitiated,
    } = useGameContext() as any;

    // ! yo remember we dont need to check actor bc it comes from a list
    /** @function checkInputValidity just checks validity of input not validity of result of the input */
    const checkInputValidity = (movieInput: string): boolean => {
        if (movieInput === '') return false;
        for (const lockedCard of lockedCards) {
            if (lockedCard.movie === movieInput) {
                console.log('already locked')
                return false;
            }
        }

        return true;
    };


    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // if notvalid or not in blblbl... then handleWrongMovieInput.. red shake etc...
        if (!checkInputValidity(globalFormState.movie)) {
            console.log('wrong input');
            // handleWrongInput();
            setShakeInitiated(true);

            return; //why does my function keep running after this?
        }
// * but when i do it with a blank input.. it works fine... but it should be the same... they both return false..
// so why does it work with the blank input but not the other one?

        console.log('you should not see me')
        //TODO stuff to check the answers...
        //
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