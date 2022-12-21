# API 

lots of help building this GraphQL server from the tutorial: [https://www.howtographql.com/graphql-js/0-introduction/]


stack: `Node.js`, `apollo-server` and `Prisma`.

`apollo-server` is a fast and simple GraphQL server library built on top of `Express.js`. It comes with several features, such as out-of-the-box support for `GraphQL Playgrounds` and realtime GraphQL subscriptions.

The resolvers of this GraphQL server are implemented using `Prisma Client` which is responsible for database access. (`SQLite`)

## Scripts
`npm run server` - starts the server in development mode
`npm run prisma` - runs the prisma CLI
`npx prisma migrate dev --name "[title-of-migration]"` - run after changing the data models schema
`npx prisma generate` - run after migration to update db