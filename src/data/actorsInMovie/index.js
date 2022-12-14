const actorsInMovie = [
    // TODO: move releaseYear property to the movies array?
    {
        movie: 'Billy Madison',
        properties: {
            title: 'Billy Madison',
            movieID: 1, /**  this is the movie-[id] in the movies array */
            releaseYear: '1995',
            actorListID: 00, /** this is the [actorListID] in the movies array */
            actors: [
                /** actorID is their id in the actors array */
                { actorID: 13, name: 'Adam Sandler', },
                { actorID: 61, name: 'Bradley Whitford', },
                { actorID: 64, name: 'Chris Farley', },
                { actorID: 63, name: 'David Spade', },
                { actorID: 62, name: 'Steve Buscemi', },
            ]
        }
    },
    {
        movie: 'Casino',
        properties: {
            title: 'Casino',
            movieID: 2,
            releaseYear: '1995',
            actorListID: 01,
            actors: [
                { actorID: 3, name: 'Robert De Niro', },
                { actorID: 65, name: 'Joe Pesci', },
                { actorID: 66, name: 'Sharon Stone', },
            ]
        }
    },
    {
        movie: 'Titanic',
        properties: {
            title: 'Titanic',
            movieID: 3,
            releaseYear: '1997',
            actorListID: 02,
            actors: [
                { actorID: 14, name: 'Leonardo DiCaprio', },
                { actorID: 25, name: 'Kate Winslet', },
                { actorID: 40, name: 'Billy Zane', },
                { actorID: 9, name: 'Kathy Bates', },
            ]
        }
    },
    {
        movie: 'Forrest Gump',
        properties: {
            title: 'Forrest Gump',
            movieID: 0,
            releaseYear: '1994',
            actorListID: 03,
            actors: [
                { actorID: 6, name: 'Tom Hanks', },
                { actorID: 2, name: 'Robin Wright', },
                { actorID: 20, name: 'Sally Field', },
            ]
        }
    },
    {
        movie: 'Goodfellas',
        properties: {
            title: 'Goodfellas',
            movieID: 4,
            releaseYear: '1990',
            actorListID: 04,
            actors: [
                { actorID: 3, name: 'Robert De Niro', },
                { actorID: 65, name: 'Joe Pesci', },
                { actorID: 25, name: 'Kate Winslet', }, // i know she really wasnt but just 4 testing SO it can relate to the actors array
            ]
        }
    },
];


/**
 * @param {string} key - key to search for in the movies array
 * @param {string} value - value of the key to search for in the movies array
 * @returns {Object} - array of objects with actorID and name properties
 */
export default function getMovieObjectByKey(key, value) {
    try {
        const movieObj = actorsInMovie.find(movie => movie.properties[key] === value);
        return movieObj;
    } catch (error) {
        console.error(error);
    }
}

// export function getMovieObject()