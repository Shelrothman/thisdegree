const { v4: uuidv4 } = require('uuid');

const config = require('../../config');


//* so we gonna grab the first element in the array
//! IF the user wants to challenge, we resend that request and present them with a list 
//* that list is the other elements in the array that gets returned from the query
//! if still not found we can go to the next page... but that is a stretch goal
//? essentially the challenge triggers us to send more requests to view the rest of the list one page one... they could keep going until no more pages left.. if they want
// it will auto go for the most "popular" right now.. which makes sense

const apiKey = config.TMDB_API_KEY.v3;

const apiBase = `https://api.themoviedb.org/3`;

const urlPrefix = `/search/movie?query=`;
const urlSuffix = `&page=1&api_key=${apiKey}`;

// TODO: other validation queries.. challenges.

//* used after user enters a movie  to validate currentActor is in it
async function validateMovie(movie, actor) {
    try {
        // let movieID = await getMovieByTitle(movie) || '';
        let actorList = [];
        const { movieID, officialTitle } = await getMovieByTitle(movie);
        if (officialTitle === "MOVIE_DOES_NOT_EXIST") {
            return { found: false, character: "", officialTitle };
        }

        let cast = await getMovieCast(movieID) || [];
        // this is saved here so we may as well pass it?... or no bc this wouldnt get called now anyway if above is dals...
        // and in resolved, we only call getCast if this passes?... so it doesnt get saved so maybe i cud delete it
        // console.log("cast", cast)
        if (cast?.length > 0) {
            actorList = await convertCastToActorList(cast);
        }


        let found = false;
        let character = '';
        console.log("castLength", cast.length)
        for (let x = 0, max = cast.length; x < max; x++) {
            let castMember = cast[x];
            console.log("castMember", castMember);
            if (castMember.name.toLowerCase() == actor.toLowerCase()) { //! doing a == instead of === 
                found = true;
                console.log("we here ri?")
                character = castMember.character;
                console.log("character", character)
                break;
            }
        }
        // delete cast;
        return { found, character, officialTitle, actorList };
    } catch (error) {
        console.error(error);
    }
}

// TODO: 
async function getMovieByTitle(movieTitle) {
    try {
        const response = await fetch(`${apiBase}${urlPrefix}${movieTitle}${urlSuffix}`);        
        const resObject = await response.json();
        // console.log("resObject", resObject);
        if (
            resObject.results.length == 0 ||
            resObject.results == undefined ||
            resObject.total_pages == 0 ||
            resObject.total_pages == undefined ||
            resObject.total_results == 0 ||
            resObject.total_results == undefined
        ) {
            return { movieID: "", officialTitle: "MOVIE_DOES_NOT_EXIST" };
        }
        let movieID = resObject?.results?.[0]?.id || '';
        let officialTitle = resObject?.results?.[0]?.original_title || '';
        return { movieID, officialTitle };
    } catch (error) {
        console.error(error);
    }
}

async function getMovieCast(movieID) {
    try {
        let cast = [];
        const response = await fetch(`${apiBase}/movie/${movieID}/credits?api_key=${apiKey}`);
        // console.log("response", response)
        
        const resObject = await response.json();
        // console.log("resObjectGetMovieCast", resObject)
        cast = resObject.cast;

        // console.log("cast", cast)
        return cast;
    } catch (error) {
        console.error(error);
    }
}

async function convertCastToActorList(cast) {
    try {
        let actorList = [];
        // the IDs are already unique so we can use them as the key (unique within TMDB)
        for (let x = 0, max = cast.length; x < max; x++) {
            let castMember = cast[x];
            let actor = {
                name: castMember.name,
                id: uuidv4(),
                character: castMember.character,
            };
            //why do we "want" the character for every single actor thats returned.. for the tree to build at the end 
            // AND for the user to challenge while in the game on a movie rejection (which happens in the game if actor is not found in movie entered)
            //? keep it in for now but if things slow down we can readdress its removal for efficiency
            //! bc we need to know the character for just the actor that the user selected... not all of them.. o but maybe we dispplay the character names next to the actor names in the selectLists! jah
            actorList.push(actor);
        }
        return actorList;
    } catch (error) {
        console.error(error);
    }
}

async function getCast(input) { 
    //* used to get the cast TO display in select optioins ONLY if the movie exists
    // * mainly used for its own query that i dont even use in ui so mayu get rif of this whole function in the future
    try {
        let actorList = [];
        const title = input.replace(/ /g, '%20');
        const { movieID } = await getMovieByTitle(title);
        // console.log("movieID", movieID)
        if (movieID !== '') {
            const movieCast = await getMovieCast(movieID);
            if (movieCast?.length > 0) {
                actorList = await convertCastToActorList(movieCast);
            }
        }
        return actorList;
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    getCast,
    validateMovie,
    getMovieCast
}