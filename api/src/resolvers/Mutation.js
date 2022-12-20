const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils/auth');
const { getCast } = require('../helpers/wikiData');

async function signup(parent, args, context, info) {
    // encrypt user's password
    const password = await bcrypt.hash(args.password, 10)
    // use the Prisma Client instance to store new user in db
    const user = await context.prisma.user.create({ data: { ...args, password } })
    // generate JWT token for newly created user, signed with APP_SECRET
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // return as an object that conforms to the shape of the AuthPayload type
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // use PrismaClient instance to retrieve an existing User record by the email address that was sent along as an argument. 
    // If no User with that email address was found, you’re returning a corresponding error.
    const user = await context.prisma.user.findUnique({
        where: {
            email: args.email
        }
    })
    if (!user) {
        throw new Error('No such user found')
    }
    // compare the provided password with the one that is stored in the database. If the two don’t match, you’re returning an error as well.
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // return as an object that conforms to the shape of the AuthPayload type
    return {
        token,
        user,
    }
}

async function addMovie(parent, args, context, info) {
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
}

async function addActor(parent, args, context, info) {
    console.log('parent:', parent)
    const newActor = await context.prisma.actor.create({
        data: {
            name: args.name,
        }
    });
    return newActor;
}

// for now this is the only method that requires authentication (other than signup and login)
async function addTree(parent, args, context, info) {
    const { userId } = context;

    const newTree = await context.prisma.tree.create({
        data: {
            treeDeclaration: args.treeDeclaration,
            postedBy: { connect: { id: userId } }
        }
    });
    // context.pubsub.publish("NEW_TREE", newTree);
    return newTree;
}

// TODO: add precheck to first see if its in the db already and if it is then get the castList from there, if not then get it from wiki


async function addMovieAndCast(parent, args, context, info) {
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
    const newMovie = await context.prisma.movie.create({
        data: {
            title: args.title,
            castList: castListString,
        },
    });
    return newMovie;
}


module.exports = {
    signup,
    login,
    addMovie,
    addActor,
    addTree,
    addMovieAndCast,
}