import React, { useState, useContext, useEffeect } from 'react';
// import { useEffect } from 'react';

const ActorStartContext = React.createContext();

export function useActorContext() {
    return useContext(ActorStartContext);
}

export function ActorStartProvider({ children }) {
    const [actorA, setActorA] = useState(null);
    const [actorB, setActorB] = useState(null);

    const handleActorSelection = (actor) => {
        if (!actorA) {
            setActorA(actor);
        } else if (!actorB) {
            setActorB(actor);
        } else {
            // if both actors are selected, then reset the actors
            setActorA(null);
            setActorB(null);
        }
    };




    return (
        <ActorStartContext.Provider value={{ actorA, actorB, handleActorSelection }}>
            {children}
        </ActorStartContext.Provider>
    );
}