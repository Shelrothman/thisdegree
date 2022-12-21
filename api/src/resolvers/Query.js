const { getCast } = require('../helpers/fetchData');


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
            }
            : {};

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



module.exports = {
    info,
    getMovies,
    getMovie,
    treeFeed,
    getCastList,
}