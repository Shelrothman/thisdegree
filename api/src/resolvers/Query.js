const { v4: uuidv4 } = require('uuid');
const {
    getCast,
    validateMovie,
    getAlternativeTitles
} = require('../helpers/fetchData');



const CHALLENGE_REASONS = {
    invalid: "invalidMovieInput",
    unfound: "actorUnfound",
};

const NOT_EXIST_STRING = "MOVIE_DOES_NOT_EXIST";

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
        const originalInput = JSON.stringify({ title, actor, movie_ID: movieID });
        return { id: uuidv4(), isInMovie, character, cast, officialTitle, originalInput };
    } catch (error) {
        console.error(error);
    }
}

async function handleNotFound(ogTitle) {
    try {
        console.log("isInMovie is False");
        // here we present the list of other movies
        const alternativeResponse = await getAlternativeTitles(ogTitle) || [];
        console.log("alternativeResponse: ", alternativeResponse)
        return {
            otherOptions: alternativeResponse.altTitles,
            continuationToken: alternativeResponse.continuationToken
        };
    } catch (error) {
        console.error(error);
    }
}

const RESULT_STRING = {
    found: (x) => `Actor Found! Movie is valid! Resend ValidationQuery with ${x} as the title.`,
    notFound: 'Valid movie but actor not found. Did you mean one of these returned titles?'
}

// const 

/**
 *  
 * @returns ChallengedValidationResult
 * @type - {ChallengedValidationResult} {
 *  id: ID!
 *  originalValidation: ChallengeValidation
 *  results: String! # stringified object of the results
 * }
 */
// * at mvp stage, they dont have ability to question actor input bc that is by default correct since its in the options already
//  TODO: modulate this further
async function challengeMovieValidation(parent, args, context) {
    try {
        const { challengeItem } = args;
        const { id, officialTitle: ogOfficialTitle, originalInput, reason } = challengeItem;
        const { title: ogTitle, actor } = JSON.parse(originalInput);
        const {
            found: isInMovie,
            character,
            officialTitle,
            actorList: cast,
            movieID
        } = await validateMovie(ogTitle, actor);
        let retVal = {
            id: uuidv4(),
            originalValidation: { id, ogOfficialTitle, originalInput },
            // TODO: add in characters and movieID?
            results: "",
            continuationToken: {
                page: 0,
                total_pages: 0,
                total_results: 0,
            }
        };
        switch (reason) {
            case CHALLENGE_REASONS.invalid:
                // *  I think this is all we want in this case for now, but may need to reasses after lookin/g at ui
                if (officialTitle === NOT_EXIST_STRING) {
                    retVal = { ...retVal, results: NOT_EXIST_STRING };
                    // indicate to client maybe they have a typo or soemthign
                } else if (isInMovie === true) {
                    retVal = { ...retVal, results: RESULT_STRING.found(officialTitle) };
                } else {
                    const { otherOptions, continuationToken } = await handleNotFound(ogTitle);
                    if (continuationToken.total_results === 0) {
                        retVal = { ...retVal, results: NOT_EXIST_STRING };
                    } else {
                        retVal = {
                            ...retVal,
                            results: RESULT_STRING.notFound,
                            otherOptions,
                            continuationToken
                        };
                    }
                }
                break;
                // ?? dude these both are doing the same thing, you dont need the switch, just one?
                // we dont need reason in the src.. that really should be in the ui (and for my self to grok what im trying to do)
                // * but maybe it will help to keep it this way for potential changes and enhancements...
                // ? so lets leave it for now
            case CHALLENGE_REASONS.unfound:
                if (isInMovie === true) {
                    console.log("isInMovie is true");
                    retVal = { ...retVal, results: RESULT_STRING.found(officialTitle) };
                } else {
                    const { otherOptions, continuationToken } = await handleNotFound(ogTitle);
                    if (continuationToken.total_results === 0) {
                        retVal = { ...retVal, results: NOT_EXIST_STRING };
                    } else {
                        retVal = {
                            ...retVal,
                            results: RESULT_STRING.notFound,
                            otherOptions,
                            continuationToken
                        };
                    }
                }
                break;
            default:
                break;
        }
        return retVal;
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