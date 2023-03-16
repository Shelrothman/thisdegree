// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useState } from "react";
import { useEffect, useState, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import { LockedCard } from "../models/LockedCard";
import UnlockedCardDiv from "./UnlockedCard";
import LockedCardDiv from "./LockedCardDiv";
// import ShakeIt from "../utils/ShakeIt";

// !! PU HERE.. useEffect to get the shaking to be dynamic and work on the first wrong input
// * may need to rethink how this is setup... be more reacty

function Game() {
    const {
        //     setLockedCards, 
        //     setUnlockedCards 
        lockedCards,
        // unlockedCards,
        setShakeInitiated,
        shakeInitiated
    } = useGameContext() as any;
    const divRef = useRef<HTMLDivElement>(null);

    // const [shaking, setShaking] = useState<Boolean>(false);

    // useEffect(() => {
    //     if (shakeInitiated) {
    //         setShaking(true);
    useEffect(() => {
        if (shakeInitiated) {
            shake();
        }
    }, [shakeInitiated]);



    function shake() {
        divRef.current?.classList.add("shaking");
        // Remove the shaking class after 2 seconds
        setTimeout(() => {
            divRef.current?.classList.remove("shaking");
            // then we set the shakeInitiated to false
            setShakeInitiated(false);
        }, 2000);
    }

    return (
        <div style={{ position: 'relative' }}>
            {lockedCards.map((lockedCard: LockedCard) => {
                return (
                    <LockedCardDiv
                        actor={lockedCard.actor}
                        movie={lockedCard.movie}
                        key={lockedCard.id}
                    />
                )
            })}
            <div ref={divRef} id='unlocked-cards-div'
                style={{
                    marginBottom: '0.5rem',
                }}
            // onClick={shake} ... so we know this works
            >
                <UnlockedCardDiv />
            </div>
            {/* {displayCurrentCard()} */}
        </div>
    );
}

export default Game;