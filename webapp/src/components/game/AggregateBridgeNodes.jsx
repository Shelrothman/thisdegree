import { useGameContext } from "../../contexts";
import CardContainer from "./CardContainer";
import MovieInput from "./form/MovieInput";
import SelectActor from "./form/SelectActor";

const AggregateBridgeNodes = () => {
    const { movieList } = useGameContext();

    // use the context to get the movieList and map it to the CardContainer

    movieList?.map((movie, i) => {
        return (
            <div key={i}>
                <CardContainer movieName={movie.movieTitle} />
                <SelectActor id={`select-actor-${i}`} handleChange={handleActorSelection} disableState={movie.actorGuessed} options={actorOptions} movieTitle={movie.movieTitle} />
                <br />
                {movie.actorGuessed && (
                    <CardContainer movieType={false} actorName={movie.actorSelection.name} movieName={movie.movieTitle} />
                )}
                {(movie.actorSelection.name !== '') && (
                    <div ref={submitRef}>
                        <MovieInput actor={movie.actorSelection.name} id={`movie-input-${i}`} ref={inputRef} btnHandler={handleSubmit} />
                    </div>
                )}
            </div>
        )})
};

export default AggregateBridgeNodes;