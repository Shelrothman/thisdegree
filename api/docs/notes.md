<PRISMA = db | GQL = server>

<!-- !!!!!!!!!!!!! -->
we are good with db setup.... MOVE ON!!!
Next is the Pagination filtering and sorting
yes i did go to far with the array things... just get the basics down and then move on to the next thing
went too far down the rabbi whole... chill out.. move on and cud always come back and edit but KEEP GOING!

<!--  TODO: eventually better iding... like add the id from the data base if there is one there already kind of thing for a movie
 * and then eventually for an actor as well 
 ! yes so the db... will build as users play bc once they enter a movie, it will be fetched
 ! then, once fetched.. the movieObj will be saved to the db
 ! SO THAT the next time the movie is guessed by another user, it will be fetched from the db and not the wiki (bc that will be the first attempt the app makes)
 -->


 /**
 * *Effectively, all the GraphQL server has to do is invoke all resolver functions for the fields that are contained in the query and then package up the response according to the query’s shape. Query resolution thus merely becomes a process of orchestrating the invocation of resolver functions!
 * /

```s 
* so we gonna grab the first element in the array
 IF the user wants to challenge, we resend that request and present them with a list 
 that list is the other elements in the array that gets returned from the query
 if still not found we can go to the next page... but that is a stretch goal
```
<!-- ? we are going to want the actors id to be set as either a new uuid if theyre not in the db, OR if their already in db then use that id. -->
<!-- TODO: so we need to implement that functionality into the db/gql stuff
we need to have the castList setting include the id (the setting within the movie setting) -->

### this is the typical workflow you will follow when updating your data:
    1. Manually adjust your Prisma data model.
    2. Migrate your database using the prisma migrate CLI commands we covered.
        (`npx prisma generate`)
    3. (Re-)generate Prisma Client
    4. Use Prisma Client in your application code to access your database.
        (`npx prisma studio`) => to see the data in the db/prisma studio 
            <!--! [no need to turn this on, just if you want to see a visual] -->

```js
<!--! After every change you make to the data model, you need to migrate your database and then re-generate Prisma Client. -->
    `npx prisma migrate dev --name "title-of-migration"`
        (builds the historical record)
    THEN re-generate Prisma Client:
        `npx prisma generate`  // this step may be redundant?
```


<!-- ? in its most basic form, a GraphQL server will have one resolver function per field in its schema. Each resolver knows how to fetch the data for its field. Since a GraphQL query at its essence is just a collection of fields, all a GraphQL server actually needs to do in order to gather the requested data is invoke all the resolver functions for the fields specified in the query. (This is also why GraphQL often is compared to RPC-style systems, as it essentially is a language for invoking remote functions.) */ -->


## subscriptions
    just doing an initial setup of them for if i need them later. not able to find a use-case for them but I probably will.
    mocking a small set up by 
        Send realtime updates to subscribed clients when a new Tree element is created
        Send realtime updates to subscribed clients when an existing Tree element is upvoted


## Pagination
<limit-offset pagination>: 
    - Request a specific chunk of the list by providing the indices of the items to be retrieved (in fact, you’re mostly providing the start index (offset) as well as a count of items to be retrieved (limit)).
    - Limit and offset have different names in the Prisma API:
        -The limit is called take, meaning you’re “taking” x elements after a provided start index.
        - The start index is called skip, since you’re skipping that many elements in the list before collecting the items to be returned. If skip is not provided, it’s 0 by default. The pagination then always starts from the beginning of the list.