import { useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import { LockedCard } from "../models/LockedCard";
import UnlockedCardDiv from "./UnlockedCard";
import LockedCardDiv from "./LockedCardDiv";


function Game() {
    const {
        lockedCards,
        setShakeInitiated,
        shakeInitiated
    } = useGameContext() as any;
    const divRef = useRef<HTMLDivElement>(null);

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
            <div ref={divRef} style={{ marginBottom: '0.5rem' }}>
                <UnlockedCardDiv wrong={true} />
            </div>
        </div>
    );
}

export default Game;