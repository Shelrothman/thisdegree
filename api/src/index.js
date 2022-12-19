/**
 * @fileoverview This file is the entry point for the GraphQL server
 */
const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path = require('path');


// dummy data
let movies = [
    {
        id: 'movie-0', title: 'Austin Powers: International Man of Mystery',
        castList: [
            { id: 0, name: 'Mike Myers' },
            { id: 1, name: 'Elizabeth Hurley' },
            { id: 2, name: 'Michael York' },
            { id: 3, name: 'Mindy Sterling' },
            { id: 4, name: 'Verne Troyer' },
        ]
    },
    {
        id: 'movie-1', title: 'E.T.',
        castList: [
            { id: 5, name: 'Henry Thomas' },
            { id: 6, name: 'Drew Barrymore' },
            { id: 7, name: 'Peter Coyote' },
            { id: 8, name: 'Dee Wallace' },
            { id: 9, name: 'Robert MacNaughton' },
        ]
    }
];

/**
 * *Effectively, all the GraphQL server has to do is invoke all resolver functions for the fields that are contained in the query and then package up the response according to the query’s shape. Query resolution thus merely becomes a process of orchestrating the invocation of resolver functions!
 */

/** helper functions */
function getMovie(id) {
    return movies.find(movie => movie.id === id);
}


// actual implementation of the schema
const resolvers = {
    Query: {
        info: () => `This is the API of this-Degree`,
        movies: () => movies,
    },

    Mutation: {
        addMovie: (parent, args) => {
            let idCount = movies.length;

            const movie = {
                id: `movie-${idCount++}`,
                title: args.title,
                // castList: args.castList,
            };
            movies.push(movie);
            return movie;
        }
    },
}
// each level of nesting corresponds to one resolver execution level
// Movie: {
// all of the three Link resolvers, the incoming parent object is the element inside the links list.
// id: (parent) => parent.id,
// title: (parent) => parent.description,
// castList: (parent) => parent.url,
// }

// schema + resolvers = GraphQL server
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server.listen().then(({ url }) =>
    console.log(`Server is running on ${url}`)
);