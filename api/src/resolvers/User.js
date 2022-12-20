function trees(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).trees();
}




module.exports = {
    trees,
}