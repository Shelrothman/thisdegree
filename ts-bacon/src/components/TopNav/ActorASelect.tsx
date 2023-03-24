import React, { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/GameContext";

const TESTORS = ["Fake Cruise", "Tom Fanks", "Julia Fakerts", "Angelina Fakie", "Leonardo DiCaprico", "Sandra Bullocky", "Brad Pitiful", "Meryl Streepish", "Johnny Depressed", "Nicole Fakeman"];


function ActorASelect() {
    
    const { globalGame, setGlobalGame } = useGameContext() as any;
    const [selected, setSelected] = useState('default');



    // useEffect(() => {
    //     if (globalGame.actorA) {
    //         setSelected(globalGame.actorA);
    //     } else {
    //         setSelected('default');
    //     }
    // }, [globalGame.actorA]);



    return (
        <select id="navbarScrollingDropdown" defaultValue="default"
        onChangeCapture={(e: any) => {
            setGlobalGame({ ...globalGame, actorA: e.target.value });
            // setSelected(e.target.value);
            // globalGame.actorA = e.target.value;
        }}>
            <option value={selected}>{globalGame.actorA}</option>
            <option value="another">
                Another action
            </option>
            <hr />
            <option value="else">
                Something else here
            </option>
        </select>
    );
}

export default ActorASelect;