const actorsInMovie = [
    {
        movie: 'Billy Madison',
        id: 00, // this is the actorListID in the movies array
        properties: {
            title: 'Billy Madison',
            releaseYear: '1995',
            actors: [
                { id: 1, name: 'Adam Sandler', },
                { id: 2, name: 'Bradley Whitford', },
                { id: 3, name: 'Steve Buscemi', },
                { id: 4, name: 'Luis Guzman', },
                { id: 5, name: 'Beverly D\'Angelo', },
                { id: 6, name: 'Cheri Oteri', },
                { id: 7, name: 'Jonathan Loughran', },
                { id: 8, name: 'Michael McKean', },
                { id: 9, name: 'David Spade', },
                { id: 10, name: 'Chris Farley', },
                { id: 11, name: 'Tim Meadows', },
            ]
        }
    },
    {
        movie: 'Casino',
        id: 01,
        properties: {
            title: 'Casino',
            releaseYear: '1995',
            actors: [
                { id: 1, name: 'Robert De Niro', },
                { id: 2, name: 'Joe Pesci', },
                { id: 3, name: 'Sharon Stone', },
                { id: 4, name: 'James Woods', },
                { id: 5, name: 'Don Rickles', },
                { id: 6, name: 'Alan King', },
                { id: 7, name: 'Kevin Pollak', },
                { id: 8, name: 'Frank Vincent', },
                { id: 9, name: 'L.Q. Jones', },
                { id: 10, name: 'T. K. Carter', },
                { id: 11, name: 'John Bloom', },
            ]
        }
    },
    {
        movie: 'Titanic',
        id: 02, 
        properties: {
            title: 'Titanic',
            releaseYear: '1997',
            actors: [
                { id: 1, name: 'Leonardo DiCaprio', },
                { id: 2, name: 'Kate Winslet', },
                { id: 3, name: 'Billy Zane', },
                { id: 4, name: 'Kathy Bates', },
                { id: 5, name: 'Frances Fisher', },
                { id: 6, name: 'Gloria Stuart', },
                { id: 7, name: 'Bill Paxton', },
                { id: 8, name: 'Bernard Hill', },
                { id: 9, name: 'David Warner', },
                { id: 10, name: 'Victor Garber', },
                { id: 11, name: 'Suzy Amis', },
            ]
        }
    },
    {
        movie: 'Forrest Gump',
        id: 03, 
        properties: {
            title: 'Forrest Gump',
            releaseYear: '1994',
            actors: [
                { id: 1, name: 'Tom Hanks', },
                { id: 2, name: 'Robin Wright', },
                { id: 3, name: 'Gary Sinise', },
                { id: 4, name: 'Sally Field', },
                { id: 5, name: 'Mykelti Williamson', },
                { id: 6, name: 'Michael Conner Humphreys', },
                { id: 7, name: 'Harold G. Herthum', },
                { id: 8, name: 'George Kelly', },
                { id: 9, name: 'Bob Penny', },
                { id: 10, name: 'John Randall', },
                { id: 11, name: 'Paul Sanchez', },
            ]
        }
    },
    {
        movie: 'Goodfellas',
        id: 04,
        properties: {
            title: 'Goodfellas',
            releaseYear: '1990',
            actors: [
                { id: 1, name: 'Robert De Niro', },
                { id: 2, name: 'Ray Liotta', },
                { id: 3, name: 'Joe Pesci', },
                { id: 4, name: 'Lorraine Bracco', },
                { id: 5, name: 'Paul Sorvino', },
                { id: 6, name: 'Frank Sivero', },
                { id: 7, name: 'Tony Darrow', },
                { id: 8, name: 'Chuck Low', },
                { id: 9, name: 'Frank Vincent', },
                { id: 10, name: 'Frank DiLeo', },
                { id: 11, name: 'Kate Winslet', }, // i know she really wasnt but just 4 testing
            ]
        }
    },
];

export default async function getActorsInMovieList() {
    return actorsInMovie;
}