
// actorListID to be sort of a foreign key
// connects to the proper list of actors in that movie
// we want to mimick the db relationship... i cud technically use that mockJSON thing but i dont necessarily want these at an endpoint...
//... hmm.. maybe I explore use GraphQL for this later on..
// just keeping it simple for now to get all the game logic set without care about the data structure
// then will come back and make this professional


const movies = [
    {
        id: 0,
        title: 'Forrest Gump',
        actorListID: 03
    },
    {
        id: 1,
        title: 'Billy Madison',
        actorListID: 00
    },
    {
        id: 2,
        title: 'Casino',
        actorListID: 01
    },
    {
        id: 3,
        title: 'Titanic',
        actorListID: 02
    },
    {
        id: 4,
        title: 'Goodfellas',
        actorListID: 04
    }
];


export function getMovieByKey(key, value) {
    return movies.find(movie => movie[key] === value);
}

export function getAllMovies() {
    return movies;
}
