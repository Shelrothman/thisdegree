import { useState, useContext, createContext } from 'react';
// TODO - generate a random list of actors each time the game starts/restarts

const ActorContext = createContext();

export function useActorContext() {
    return useContext(ActorContext);
}

export function ActorContextProvider({ children }) {
    const [actorA, setActorA] = useState(null);
    const [actorB, setActorB] = useState(null);
    // const [actorB, setActorB] = useState('Meg Ryan');

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
        <ActorContext.Provider value={{ actorA, actorB, handleActorSelection, setActorA, setActorB }}>
            {children}
        </ActorContext.Provider>
    );
}