const { v4: uuidv4 } = require('uuid');
const { getCast, validateMovie } = require('../helpers/fetchData');



function info() {
    return `This is the API of this-Degree`;
}

async function getMovies(parent, args, context) {
    try {
        return context.prisma.movie.findMany();
    } catch (error) {
        console.error(error);
    }
}

async function getMovie(parent, args, context) {
    try {
        return context.prisma.movie.findUnique({
            where: {
                id: args.id,
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function treeFeed(parent, args, context) {
    try {
        const where = args.filter
            ? {
                OR: [
                    { id: { contains: args.filter } },
                    { treeDeclaration: { contains: args.filter } },
                    // { postedBy[name]: { contains: args.filter } },
                ],
            } : {};
        const trees = await context.prisma.tree.findMany({
            where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy,
        });
        // the count of all trees that satisfy the where condition
        const count = await context.prisma.tree.count({ where });
        return { trees, count };
    } catch (error) {
        console.error(error);
    }
}

async function getCastList(parent, args, context) {
    try {
        let castList = await getCast(args.title);
        return castList;
    } catch (error) {
        console.error(error);
    }
}


async function validateMovieInput(parent, args, context) {
    try {
        const { title, actor } = args;
        const {
            found: isInMovie,
            character,
            officialTitle,
            actorList: cast,
            movieID
        } = await validateMovie(title, actor);
        const originalInput = `{title: ${title}, actor: ${actor}, movie_ID: ${movieID}}`;
        return { id: uuidv4(), isInMovie, character, cast, officialTitle, originalInput };
    } catch (error) {
        console.error(error);
    }
}

// input ChallengeValidationInput {
//     id: ID
//     officialTitle: String! # yea the client will be able to send this back.
//     originalInput: String!
// }

async function challengeMovieValidation(parent, args, context) {
    try {
        const { id, officialTitle, originalInput, reason } = args;
        // const { officialTitle, actor } = movieValidation;

        // steps that need to happen:
        // they are challenging "invalid movie input." 
        // * at mvp stage, they dont have ability to question actor input bc that is by default correct since its in the options already
        // they either entered a Movie that is not a valid movie in the API
        // OR their actor is not in found in the cast
        // ? there is no other situation...
        // so handeling the first scenario.. check if in JSON.parse(originalInput).title is "MOVIE DOES NOT EXIST".
        // desnt exist then show them the list of options  from the array returned form fetching the movie using the movie title
        // if ...
        // does exist then return the actual cast 
        // in ui hanlde that like more complexly... have the user have to work in some way.../// 
        // so just return the actual cast,.. (do u see ur actoir here?)... 
        // ! if they dooo see the actor but the validation is stil false... then they have option to report an issue to me hahah
        // 

        // !!!!!!!!!! PU HERREREEEEEEEEEEEEEEEEEEEEEEEEE
        switch (reason) {
            case "invalidMovieInput":
                const { title, actor } = JSON.parse(originalInput);

                break;
            case "actorUnfound":
            default:
                break;
        }


        // return movieValidation;
    } catch (error) {
        console.error(error);
    }
}



module.exports = {
    info,
    getMovies,
    getMovie,
    treeFeed,
    getCastList,
    validateMovieInput,
    challengeMovieValidation,
}