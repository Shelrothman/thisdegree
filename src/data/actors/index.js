// just doing this in a file bc honestly, using the mockjson thing is literally goiong to be the same amount of lines of code

const actors = [
    { id: 0, name: 'Jonah Hill', },
    { id: 1, name: 'Jack Nicholson', },
    { id: 2, name: 'Marlon Brando', },
    { id: 3, name: 'Robert De Niro', },
    { id: 4, name: 'Al Pacino', },
    { id: 5, name: 'Dustin Hoffman', },
    { id: 6, name: 'Tom Hanks', },
    { id: 7, name: 'Daniel Day-Lewis', },
    { id: 8, name: 'Sean Penn', },
    { id: 9, name: 'Kathy Bates', },
    { id: 10, name: 'Denzel Washington', },
    { id: 11, name: 'Anthony Hopkins', },
    { id: 12, name: 'Paul Newman', },
    { id: 13, name: 'Adam Sandler', },
    { id: 14, name: 'Leonardo DiCaprio', },
    { id: 15, name: 'Morgan Freeman', },
    { id: 16, name: 'Jennifer Annistor', },
    { id: 17, name: 'Meryl Streep', },
    { id: 18, name: 'Jodie Foster', },
    { id: 19, name: 'Helen Mirren', },
    { id: 20, name: 'Sally Field', },
    { id: 21, name: 'Nicole Kidman', },
    { id: 22, name: 'Julia Roberts', },
    { id: 23, name: 'Cate Blanchett', },
    { id: 24, name: 'Angelina Jolie', },
    { id: 25, name: 'Kate Winslet', },
    { id: 26, name: 'Gwyneth Paltrow', },
    { id: 27, name: 'Charlize Theron', },
    { id: 28, name: 'Maggie Smith', },
    { id: 29, name: 'Glenn Close', },
    { id: 30, name: 'Emma Thompson', },
    { id: 31, name: 'Halle Berry', },
    { id: 32, name: 'Judi Dench', },
    { id: 33, name: 'Shirley MacLaine', },
    { id: 34, name: 'Frances McDormand', },
    { id: 35, name: 'Katharine Hepburn', },
    { id: 36, name: 'Sandra Bullock', },
    { id: 37, name: 'Barbra Streisand', },
    { id: 38, name: 'Bette Davis', },
    { id: 39, name: 'Kathryn Bigelow', },
    { id: 40, name: 'Billy Zane', },
    { id: 41, name: 'Lina Wertmuller', },
    { id: 42, name: 'Greta Gerwig', },
    { id: 43, name: 'Kathryn Hahn', },
    { id: 44, name: 'Kristen Wiig', },
    { id: 45, name: 'Melissa McCarthy', },
    { id: 46, name: 'Amy Poehler', },
    { id: 47, name: 'Tina Fey', },
    { id: 48, name: 'Emma Stone', },
    { id: 49, name: 'Julia Louis-Dreyfus', },
    { id: 50, name: 'Viola Davis', },
    { id: 51, name: 'Jack Black', },
    { id: 52, name: 'Steve Carell', },
    { id: 53, name: 'Will Ferrell', },
    { id: 54, name: 'Eddie Murphy', },
    { id: 55, name: 'Bill Murray', },
    { id: 56, name: 'Ben Stiller', },
    { id: 57, name: 'Kenan Thompson', },
    { id: 58, name: 'Seth Rogen', },
    { id: 59, name: 'Will Forte', },
    { id: 60, name: 'Jason Segel', },
    { id: 61, name: 'Bradley Whitford', },
    { id: 62, name: 'Steve Buscemi', },
    { id: 63, name: 'David Spade', },
    { id: 64, name: 'Chris Farley', },
    { id: 65, name: 'Joe Pesci', },
    { id: 66, name: 'Sharon Stone', },
    { id: 67, name: 'Robin Wright  ', },
];


export async function getAllActors() {
    return actors;
}

export function getActorByKey(key, value) {
    return actors.find(actor => actor[key] === value);
}
