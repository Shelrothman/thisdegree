function FormBridgeNode({ movie, i,  }) {
    return (
        <div key={i}>
            <CardContainer movie={movie} />
            <SelectActor
                id={`select-actor-${i}`}
                handleChange={handleActorSelection}
                disableState={movie.actorGuessed}
                options={actorOptions}
                movieTitle={movie.movieTitle}
            />
            <br />
            {movie.actorGuessed && (
                <CardContainer movie={movie} movieType={false} />
            )}
            {(movie.actorSelection !== '') && (
                <div ref={submitRef}>
                    <MovieInput actor={movie.actorSelection} id={`movie-input-${i}`} ref={inputRef} btnHandler={handleSubmit} />
                </div>
            )}
        </div>
    );
}

export default FormBridgeNode;