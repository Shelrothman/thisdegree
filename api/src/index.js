/**
 * @fileoverview This file is the entry point for the GraphQL server
 */
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const { getCastFromWiki } = require('./helpers/wikiData');

const prisma = new PrismaClient();

// dummy data
// let movies = [
//     {
//         id: 'movie-0', title: 'Austin Powers: International Man of Mystery',
//         castList: [
//             { id: 0, name: 'Mike Myers' },
//             { id: 1, name: 'Elizabeth Hurley' },
//             { id: 2, name: 'Michael York' },
//             { id: 3, name: 'Mindy Sterling' },
//             { id: 4, name: 'Verne Troyer' },
//         ]
//     },
//     {
//         id: 'movie-1', title: 'E.T.',
//         castList: [
//             { id: 5, name: 'Henry Thomas' },
//             { id: 6, name: 'Drew Barrymore' },
//             { id: 7, name: 'Peter Coyote' },
//             { id: 8, name: 'Dee Wallace' },
//             { id: 9, name: 'Robert MacNaughton' },
//         ]
//     }
// ];


/** helper functions */
// function getMovie(id) {
//     return movies.find(movie => movie.id === id);
// }
async function getCast(movieTitle) {
    // TODO: add precheck to first see if its in the db already and if it is then get the castList from there
    try {
        let castList = [];
        let actorList = await getCastFromWiki(movieTitle);
        for (let i = 0, max = actorList.length; i < max; i++) {
            castList.push({ id: uuidv4(), name: actorList[i] });
        }
        console.log(castList)
        return castList;
    } catch (error) {
        console.error(error);
    }
}




// actual implementation of the schema
const resolvers = {
    Query: {
        info: () => `This is the API of this-Degree`,
        movies: async (parent, args, context) => {
            return context.prisma.movie.findMany();
        },
    },

    Mutation: {
        addMovie: async (parent, args, context, info) => {
            let list = JSON.stringify(await getCast(args.title));
            const newMovie = context.prisma.movie.create({
                // context is an entire Prism Client instance.. allows us access to our db through the Prism Client API
                data: {
                    title: args.title,
                    castList: list,
                },
            });
            //? make the response more readable but keeping it as string for the db
            // newMovie.castList = JSON.parse(newMovie.castList); 
            return newMovie;
        }
        // addCast: (parent, args) => 
    },
}
// each level of nesting corresponds to one resolver execution level
// * i.e. Each field in a GraphQL schema is backed by a resolver.
/* 
? in its most basic form, a GraphQL server will have one resolver function per field in its schema. Each resolver knows how to fetch the data for its field. Since a GraphQL query at its essence is just a collection of fields, all a GraphQL server actually needs to do in order to gather the requested data is invoke all the resolver functions for the fields specified in the query. (This is also why GraphQL often is compared to RPC-style systems, as it essentially is a language for invoking remote functions.) */

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
    context: {
        prisma,
    }
    // the context object that’s passed into all your GraphQL resolvers is being initialized right here and because you’re attaching an instance of PrismaClient (as prisma) to it when the GraphQLServer is instantiated, you’ll now be able to access context.prisma in all of your resolvers.
});

server.listen().then(({ url }) =>
    console.log(`Server is running on ${url}`)
);