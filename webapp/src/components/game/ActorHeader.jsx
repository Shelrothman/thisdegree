import { useGameContext } from "../../contexts";


// toDO; display whethe user is in actor or movie mode

function ActorHeader() {

    const { actorA, actorB } = useGameContext();

    return (
        <div className="container text-center">
            Actor A: <strong>{actorA}</strong>
            <br />
            Actor B: <strong>{actorB}</strong>
        </div>
    );
}

export default ActorHeader;