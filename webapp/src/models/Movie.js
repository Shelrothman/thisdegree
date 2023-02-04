/**
 * @class Movie
 * @description - Add to global list each correct round
 * @param {string} id - uuid
 * @param {string} userMovieInput - title of movie
 * @param {string} currentActorBridge - name of actor from previous round
 * @param {string} previousActorCharacterName - name of character of actor from previous round
 */

class Movie {
    constructor(id, userMovieInput, currentActorBridge, previousActorCharacterName) {
        this.id = id;
        this.movieTitle = userMovieInput;
        this.previousActor = {
            name: currentActorBridge,
            characterName: previousActorCharacterName
        };
        this.actorGuessed = false;
        this.actorSelection = {
            id: '',
            name: '...', // this is nice for the ui for now
            characterName: '...',
        }
    }
}


export default Movie;