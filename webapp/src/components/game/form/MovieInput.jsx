import { forwardRef } from "react";

const MovieInput = forwardRef(function MovieInput(props, ref) {
    const { actor, id } = props;
    return (
        <label htmlFor="movie-bridge">
            Movie with {actor} in it:
            <input id={id} ref={ref} />
        </label>
    );
});

export default MovieInput;