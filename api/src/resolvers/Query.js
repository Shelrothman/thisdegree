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

async function getCastList(parent, args, context) {
    let castList = await getCast(args.title);
    return castList;
}



module.exports = {
    info,
    getMovies,
    getMovie,
    getCastList,
}