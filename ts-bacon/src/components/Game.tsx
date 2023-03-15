// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { LockedCard } from "../models/LockedCard";
import UnlockedCardDiv from "./UnlockedCard";
import LockedCardDiv from "./LockedCardDiv";

function Game() {
    const {
        //     setLockedCards, 
        //     setUnlockedCards 
        lockedCards,
        // unlockedCards,
    } = useGameContext() as any;

    // const displayLockedCards = lockedCards.map((lockedCard: LockedCard) => {
    //     return (
    //         <LockedCardDiv
    //             actor={lockedCard.actor}
    //             movie={lockedCard.movie}
    //         />
    //     )
    // });


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
            <UnlockedCardDiv />
        </div>
    );
}

export default Game;