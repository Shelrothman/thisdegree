const config = require('../config');


//* so we gonna grab the first element in the array
// IF the user wants to challenge, we resend that request and present them with a list 
// that list is the other elements in the array that gets returned from the query
// if still not found we can go to the next page... but that is a stretch goal
const apiKey = config.TMDB_API_KEY.v3;

const apiBase = `https://api.themoviedb.org/3`;

const urlPrefix = `/search/movie?query=`
const urlSuffix = `&page=1&api_key=${apiKey}`;

let movieID;

async function getMovieByTitle(movieTitle) {
    try {
        const response = await fetch(`${apiBase}${urlPrefix}${movieTitle}${urlSuffix}`);

        const resObject = await response.json();
        // console.log("resObject", resObject)
        movieID = resObject.results[0].id;
        return movieID;
    } catch (error) {
        console.error(error);
    }
}

async function getMovieCast(movieID) {
    try {
        const response = await fetch(`${apiBase}/movie/${movieID}/credits?api_key=${apiKey}`);

        const resObject = await response.json();
        // console.log("resObject", resObject)
        return resObject.cast;
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
                id: castMember.id,
                character: castMember.character,
            }
            actorList.push(actor);
        }
        return actorList;
    } catch (error) {
        console.error(error);
    }
}

async function main(input) {
    const title = input.replace(/ /g, '%20');
    const movieID = await getMovieByTitle(title);
    const movieCast = await getMovieCast(movieID);
    const actorList = await convertCastToActorList(movieCast);
    // console.log("movieCast", movieCast)
    return actorList;
}

