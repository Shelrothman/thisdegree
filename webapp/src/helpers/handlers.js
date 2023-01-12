


export function handleInvalidMovieInput(inputRef) {
    console.log('invalid movie selection');
    inputRef.current.value = `INVALID MOVIE`;
    // TODO: tell the user its wrong in a different way then above.. this is just a hack for now
    setTimeout(() => {
        inputRef.current.value = '';
    }, 1000);
    return;
}


// w/e u pass, it can work with