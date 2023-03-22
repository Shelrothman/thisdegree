/**
 * this to do the setting
 */
import { useGameContext } from '../../contexts/GameContext';
import Button from 'react-bootstrap/Button';
import { LockedCard } from '../../models/LockedCard';
import React, { useRef, useEffect } from 'react';



function Submit() {

    const {
        setLockedCards,
        lockedCards,
        // setUnlockedCards,
        globalFormState,
        // setGlobalFormState,
        resetFormState,
        shakeInitiated,
        setShakeInitiated,
    } = useGameContext() as any;
    // const [disabled, setDisabled] = useState(shakeInitiated);
    const buttonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if (buttonRef.current) {
            if (shakeInitiated || globalFormState.movie === '') {
                buttonRef.current.disabled = true;
            } else {
                buttonRef.current.disabled = false;
            }
        }
    }, [shakeInitiated, globalFormState]);

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
            setShakeInitiated(true);
            return;
        }
        //TODO stuff to check the answers...
        //
        // if correct then ::::
        setLockedCards((prevLockedCards: LockedCard[]) => {
            return [...prevLockedCards, new LockedCard(globalFormState.movie, globalFormState.actor)];
        });
        resetFormState();
        // const scrollTo = document.getElementById('unlocked-cards-div');
        //? its already doing the visual we want; appearing the locked 
        // scrollTo?.scrollIntoView({ behavior: 'smooth' });
    }


    return (
        <Button variant="primary" onClick={handleSubmit} ref={buttonRef}>
            Submit
        </Button>
    );
}

export default Submit;