/**
 * @fileoverview This file is the entry point for the GraphQL server
 */
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
// const { PubSub } = require('graphql-subscriptions');
// const PubSub = require('apollo-server');

const { getUserId } = require('./utils/auth');
// const Subscription = require('./resolvers/Subscription');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Tree = require('./resolvers/Tree');


// const pubsub = new PubSub();
const prisma = new PrismaClient();



// actual implementation of the schema
const resolvers = {
    Query,
    Mutation,
    // Subscription,
    User,
    Tree,
};
// each level of nesting corresponds to one resolver execution level
// * i.e. Each field in a GraphQL schema is backed by a resolver.


// schema + resolvers = GraphQL server
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            // pubsub, // access the subscription-implementation-models from inside our resolvers via context.pubsub
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        };
    }
});
// creating the context as a function which returns the context. The advantage of this approach is that you can attach the HTTP request that carries the incoming GraphQL query (or mutation) to the context as well. This will allow your resolvers to read the Authorization header and validate if the user who submitted the request is eligible to perform the requested operation.


server.listen().then(({ url }) =>
    console.log(`Server is running on ${url}`)
);