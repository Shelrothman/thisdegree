class Movie {
    constructor(id, movieTitle, currentActorBridge, previousActorCharacterName) {
        this.id = id;
        this.movieTItle = movieTitle;
        this.previousActor = {
            name: previousActorCharacterName,
            character: previousActorCharacterName
        };
        this.actorGuessed = false;
        this.actorSelection = {
            id: '',
            name: '...',
            characterName: '...',
        }
    }
}


export default Movie;