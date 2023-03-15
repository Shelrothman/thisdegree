// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useState } from "react";
// import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { LockedCard } from "../models/LockedCard";
import UnlockedCardDiv from "./UnlockedCard";
import LockedCardDiv from "./LockedCardDiv";
import ShakeIt from "../utils/ShakeIt";

// !! PU HERE.. useEffect to get the shaking to be dynamic and work on the first wrong input
// * may need to rethink how this is setup... be more reacty

function Game() {
    const {
        //     setLockedCards, 
        //     setUnlockedCards 
        lockedCards,
        // unlockedCards,
        shakeInitiated
    } = useGameContext() as any;


    const displayCurrentCard = () => {
        if (!shakeInitiated) return <UnlockedCardDiv />;
        return (
            <ShakeIt 
                child={<UnlockedCardDiv />}
            />
        )
    };

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
            {/* {shakeInitiated ? <div className='shake'>Wrong!</div> : null}
            <UnlockedCardDiv /> */}
            {displayCurrentCard()}
        </div>
    );
}

export default Game;