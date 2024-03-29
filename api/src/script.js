// Import the PrismaClient constructor from the @prisma/client node module.
const { PrismaClient } = require('@prisma/client');

// Instantiate PrismaClient.
const prisma = new PrismaClient();

// send queries to the database. 
// write all your queries inside this function.\
async function main() {
    // const newMovie = await prisma.movie.create({
    //     data: {
    //         title: 'E.T.',
    //         castList: JSON.stringify(testList),
    //     },
    // });
    // const deleteMovie = await prisma.movie.delete({
    //     where: {
    //         id: '2193c0d2-de46-4abb-a249-cb0ade7ccff0',
    //     },
    // });
    // WE can do these like in our resolvers or something..
    //we can attach an instance of Prisma Client to the context when initializing the server and then access it from inside our resolvers via the context argument!
    const allMovies = await prisma.movie.findMany();
    // console.log(allMovies);
    const allActors = await prisma.actor.findMany();
    // console.log(allActors);
    console.log('-----------------');
    
    const allTrees = await prisma.tree.findMany();
    console.log(allTrees);

    const allUsers = await prisma.user.findMany();
    // console.log(allUsers);

}

main() // call the main function
    .catch(error => {
        throw error
    })
    // Close the database connections when the script terminates.
    .finally(async () => {
        await prisma.$disconnect();
    })