
// actorListID to be sort of a foreign key
// connects to the proper list of actors in that movie
// we want to mimick the db relationship... i cud technically use that mockJSON thing but i dont necessarily want these at an endpoint...
//... hmm.. maybe I explore use GraphQL for this later on..
// just keeping it simple for now to get all the game logic set without care about the data structure
// then will come back and make this professional


const movies = [
    { id: 0, title: 'Forrest Gump', actorListID: 0 },
    { id: 1, title: 'Billy Madison', actorListID: 1 },
    { id: 2, title: 'Casino', actorListID: 2 },
    { id: 3, title: 'Titanic', actorListID: 3 },
    { id: 4, title: 'Goodfellas', actorListID: 4 },
    { id: 5, title: 'Home', actorListID: 5 },
    { id: 6, title: 'E.T.', actorListID: 6 },
    { id: 7, title: 'The Matrix', actorListID: 7 },
    { id: 8, title: 'The Lion King', actorListID: 8 },
    { id: 9, title: 'it', actorListID: 9 }, // use for testing

];


export function getMovieByKey(key, value) {
    console.log('getMovieByKey() key: ', key, ' value: ', value);
    return movies.find(movie => movie[key] === value);
}

export function getAllMovies() {
    return movies;
}
