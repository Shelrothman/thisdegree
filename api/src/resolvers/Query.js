const { getCast } = require('../helpers/wikiData');


function info() {
    return `This is the API of this-Degree`;
}

async function getMovies(parent, args, context) {
    return context.prisma.movie.findMany();
}

async function getMovie(parent, args, context) {
    return context.prisma.movie.findUnique({
        where: {
            id: args.id,
        }
    });
}

async function getTrees(parent, args, context) {
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
            // skip: args.skip,
            // take: args.take,
            // orderBy: args.orderBy,
        });

    return trees;
    
    
}

async function getCastList(parent, args, context) {
    try {
        
    } catch (error) {
        console.error(error);
    }
    let castList = await getCast(args.title);
    return castList;
}



module.exports = {
    info,
    getMovies,
    getMovie,
    getTrees,
    getCastList,
}