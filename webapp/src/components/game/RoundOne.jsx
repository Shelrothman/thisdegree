import { useGameContext } from "../../contexts";

function RoundOne() {
    // const { actorA, actorB } = useActorContext();
    const { readyToInputFirst, handleFirstClick } = useGameContext();
    return (
        <div>
            <MovieBtn text={actorA} handler={handleFirstClick} />
            <br />
            {readyToInputFirst && (
                <div ref={submitRef}>
                    <MovieInput actor={actorA} ref={inputRef} id='movie-input-first' btnHandler={handleSubmit} />
                </div>
            )}
        </div>
    );
}

export default RoundOne;