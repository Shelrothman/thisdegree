let list = [ { id: '1', name: 'John' }, { id: '2', name: 'Jane' } ];

const newMovie = {
    id: 2,
    castList: JSON.stringify(list),
}

console.log(newMovie);

newMovie.castList = JSON.parse(newMovie.castList);

console.log(newMovie);