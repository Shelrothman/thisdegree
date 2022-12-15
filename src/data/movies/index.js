
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
        actorListID: 0
    },
    {
        id: 1,
        title: 'Billy Madison',
        actorListID: 1
    },
    {
        id: 2,
        title: 'Casino',
        actorListID: 2
    },
    {
        id: 3,
        title: 'Titanic',
        actorListID: 3
    },
    {
        id: 4,
        title: 'Goodfellas',
        actorListID: 4
    }
];


export function getMovieByKey(key, value) {
    console.log('getMovieByKey() key: ', key, ' value: ', value);
    return movies.find(movie => movie[key] === value);
}

export function getAllMovies() {
    return movies;
}
