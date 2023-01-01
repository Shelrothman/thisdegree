import { useActorContext } from "../../contexts";


function ActorHeader() {

    const { actorA, actorB } = useActorContext();

    return (
        <div>
            Actor A: {actorA}
            <br />
            Actor B: {actorB}
        </div>
    );
}

export default ActorHeader;