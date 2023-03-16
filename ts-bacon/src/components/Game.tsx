import { useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import { LockedCard } from "../models/LockedCard";
import UnlockedCardDiv from "./UnlockedCard";
import LockedCardDiv from "./LockedCardDiv";
import shake from "../utils/shake";

function Game() {
    const {
        lockedCards,
        setShakeInitiated,
        shakeInitiated,
        globalFormState
    } = useGameContext() as any;

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shakeInitiated) {
            shake(divRef, setShakeInitiated);
        }
    }, [shakeInitiated]);


    return (
        <div style={{ position: 'relative' }}>
            {lockedCards.map((lockedCard: LockedCard) => {
                return (
                    <LockedCardDiv
                        round={lockedCards.indexOf(lockedCard) + 1}
                        actor={lockedCard.actor}
                        movie={lockedCard.movie}
                        key={lockedCard.id}
                    />
                )
            })}
            <div ref={divRef} style={{ marginBottom: '0.5rem' }}>
                <UnlockedCardDiv round={lockedCards.length + 1} />
            </div>
        </div>
    );
}

export default Game;