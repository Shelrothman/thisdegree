import { useState, useContext, createContext } from 'react';


const ActorContext = createContext();
//? would it be better to have these inside the provider?
export function useActorContext() {
    return useContext(ActorContext);
}

export function ActorContextProvider({ children }) {
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
        <ActorContext.Provider value={{ actorA, actorB, handleActorSelection }}>
            {children}
        </ActorContext.Provider>
    );
}