function SelectActor({
    disableState,
    movieTitle,
    id,
    handleChange,
    options,
}) {
    return (
        <select
            aria-label="actor selection"
            id={id}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disableState}
        >
            <option value='select'>
                Select an actor from {movieTitle}
            </option>
            {options}
        </select>
    );
}

export default SelectActor;