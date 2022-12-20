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

async function getCast(movieTitle) {
    // TODO: add precheck to first see if its in the db already and if it is then get the castList from there
    try {
        let castList = [];
        let actorList = await getCastFromWiki(movieTitle);
        for (let i = 0, max = actorList.length; i < max; i++) {
            castList.push({ id: uuidv4(), name: actorList[i] });
        }
        console.log(castList)
        if (castList.length === 0) return [];
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
        movie: async (parent, args, context) => {
            return context.prisma.movie.findUnique({
                where: {
                    id: args.id,
                }
            });
        },
        getCastList: async (parent, args, context) => {
            let castList = await getCast(args.title);
            return castList;
        },
    },
    // TODO: add precheck to first see if its in the db already and if it is then get the castList from there
    Mutation: {
        addMovie: async (parent, args, context, info) => {
            let rawList = await getCast(args.title);
            let list = JSON.stringify(rawList);
            // TODO: make it so that when a movie is added, it also adds all the ACTORS in castList to the db
            const newMovie = await context.prisma.movie.create({
                // context is an entire Prism Client instance.. allows us access to our db through the Prisma Client API
                data: {
                    title: args.title,
                    castList: list,
                },
            });
            return newMovie;
        },
        addActor: async (parent, args, context, info) => {
            console.log('parent:', parent)
            const newActor = await context.prisma.actor.create({
                data: {
                    name: args.name,
                }
            });
            return newActor;
        },
        
        addMovieAndCast: async (parent, args, context, info) => {
            let rawCastList = await getCast(args.title);
            let castListString = JSON.stringify(rawCastList);
            //! createMany() is not allowed in SQLite
            rawCastList.forEach(async (actor) => {
                await context.prisma.actor.create({
                    data: {
                        name: actor.name,
                    }
                });
            });
            // let movieExists = await context.prisma.movie.findUnique({
            //     where: {
            //         title: args.title,
            //     }
            // });
            // if (movieExists) return movieExists;
            const newMovie = await context.prisma.movie.create({
                data: {
                    title: args.title,
                    castList: castListString,
                },
            });
            // return { movie: newMovie, cast: rawList };
            return newMovie;
        },
    },
}
// each level of nesting corresponds to one resolver execution level
// * i.e. Each field in a GraphQL schema is backed by a resolver.


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