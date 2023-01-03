import { useActorContext } from "../../contexts";


function ActorHeader() {

    const { actorA, actorB } = useActorContext();

    return (
        <div className="container text-center">
            Actor A: <strong>{actorA}</strong>
            <br />
            Actor B: <strong>{actorB}</strong>
        </div>
    );
}

export default ActorHeader;