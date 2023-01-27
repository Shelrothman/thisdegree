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

const NOT_EXIST_STRING = "MOVIE_DOES_NOT_EXIST";


// TODO: other validation queries.. challenges.

//* used after user enters a movie  to validate currentActor is in it
async function validateMovie(movie, actor) {
    try {
        let actorList = [];
        const { movieID, officialTitle } = await getMovieByTitle(movie);
        if (officialTitle === NOT_EXIST_STRING) {
            return { found: false, character: "", officialTitle, actorList, movieID };
        }
        // yaa cant know if its false WITHOUT getting the cast silly,.,.
        let cast = await getMovieCast(movieID) || [];
        if (cast?.length > 0) {
            actorList = await convertCastToActorList(cast);
        }
        let found = false;
        let character = '';
        for (let x = 0, max = cast.length; x < max; x++) {
            let castMember = cast[x];
            if (castMember.name.toLowerCase() == actor.toLowerCase()) { //! doing a == instead of === 
                found = true;
                character = castMember.character;
                console.log("character", character)
                break;
            }
        }
        return { found, character, officialTitle, actorList, movieID };
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
            return { movieID: "", officialTitle: NOT_EXIST_STRING };
        }
        let movieID = resObject?.results?.[0]?.id || '';
        let officialTitle = resObject?.results?.[0]?.original_title || '';
        return { movieID, officialTitle };
    } catch (error) {
        console.error(error);
    }
}

async function getAlternativeTitles(ogTitle) {
    try {
        const response = await fetch(`${apiBase}${urlPrefix}${ogTitle}${urlSuffix}`);
        const resObject = await response.json();

        const movieObjects = resObject.results || [];
        
        let retVal = {
            total_pages: resObject.total_pages || 0,
            total_results: resObject.total_results || 0,
            altTitles: [],
            continuation: '' // some kind of thing to paginate the results
        }
        for (var x = 0, max = movieObjects.length; x < max; x++) {
            let movieObject = movieObjects[x];
            retVal.altTitles.push({title: movieObject.title});
        }
        // get the total amount of pages so can return that iterator for uiser to say show me the next page- another list.. if they want...

        console.log("retVal", retVal)
        return retVal;
    } catch (error) {
        console.error(error);
        
    }
}

async function getMovieCast(movieID) {
    try {
        let cast = [];
        const response = await fetch(`${apiBase}/movie/${movieID}/credits?api_key=${apiKey}`);
        const resObject = await response.json();
        cast = resObject.cast;
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
    getMovieCast,
    getAlternativeTitles
}