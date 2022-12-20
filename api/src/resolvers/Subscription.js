/**
 * Resolvers for subscriptions are slightly different than the ones for queries and mutations:
 * Rather than returning any data directly, they return an AsyncIterator which subsequently is used by the GraphQL server to push the event data to the client.
 * Subscription resolvers are wrapped inside an object and need to be provided as the value for a subscribe field. 
 * You also need to provide another field called resolve that actually returns the data from the data emitted by the AsyncIterator.
 */


/** used to resolve subscriptions and push the event data. */
function newTreeSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator(["NEW_TREE"]);
}

const newTree = {
    subscribe: newTreeSubscribe,
    resolve: payload => {
        return payload;
    },
};

module.exports = {
    newTree,
}