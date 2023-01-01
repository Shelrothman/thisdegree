import { useGameContext } from "../../contexts";



function AggregateBridgeNodes() {
    const { movieList, currentActorBridge, handleActorSelection, currentActorOptions } = useGameContext();

    const actorOptions = currentActorOptions?.map((actor) => {
        return (
            <option key={actor.id} value={actor.name}>{actor.name}</option>
        )
    });

// ! hokay first we need to modulate the select compooentnets then come back here .. i havent deleted anything in og stuff so all good

    const buildBridgeNodes = movieList?.map((movie, i) => {
        return (
            <div key={i}>
                {/* <CardContainer />
                <SelectActor id={`select-actor-${i}`} handleChange={handleActorSelection} disableState={movie.actorGuessed} options={actorOptions} movieTitle={movie.movieTitle} />
                <br />
                {movie.actorGuessed && (
                    <CardContainer movieType={false} actorName={movie.actorSelection.name} />
                )} */}
                {/* {(movie.actorSelection.name !== '') && (
                    <div ref={submitRef}>
                        <MovieInput actor={movie.actorSelection.name} id={`movie-input-${i}`} ref={inputRef} btnHandler={handleSubmit} />
                    </div>
                )} */}
            </div>
        )
    });


    return (  );
}

export default AggregateBridgeNodes;