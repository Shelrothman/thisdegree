import { forwardRef } from 'react';


const InputForm = forwardRef(function InputForm(props, ref) {
    // function InputForm({ currentMovie, actor, handleSubmit, inputRef, submitRef }) {
    return (
        <div ref={submitRef}>
            <label htmlFor="movie-bridge">
                Movie with {actor} in it:
            </label>
            {' '}
            <input ref={inputRef} disabled={currentMovie !== ''} />
            {/* <button onClick={handleSubmit} disabled={currentMovie !== ''}
            >
                Submit
            </button> */}
        </div>
    );
});

export default InputForm;