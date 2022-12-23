import { forwardRef } from "react";
import SubmitBtn from "../../buttons/SubmitBtn";

const MovieInput = forwardRef(function MovieInput(props, ref) {
    const { actor, id, btnHandler } = props;
    //* the input ref should always be the last one rendered? 
    return (
        <>
            <label htmlFor="movie-bridge">
                Movie with {actor} in it:
                <input id={id} ref={ref} />
            </label>
            <SubmitBtn handler={btnHandler} />
        </>
    );
});

export default MovieInput;