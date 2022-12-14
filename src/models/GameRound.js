/**
 * @class GameRound
 * @description- one round = an actorA and a  movie guess (verifyMovie), 
 * then an actorB as the selection and complete(). 
 * then the next round: the old actorB is the new actorA and the new actorB is the new selection and so on.
 * @actorA and @actorB are the two actors that are being compared in this particular Game instance (not the overall a and b actors). just the particular comparison in the current round
 * @param {string} actorA - the last actor that was selected from the list of actors in previous round; 
 * ! keep the fetching and the checking/verifying logic all in here and other classes SO THAT we can just import the classes into components and use them without having to worry about the logic, reuseability, etc.
 */

import { getMovieByKey } from '../data/movies';
import { getActorByKey } from '../data/actors';
import getMovieObjectByKey from '../data/actorsInMovie';

export default class GameRound {
    constructor(actorA, movieGuess) {
        this.actorA = actorA;
        this.movieTitle = movieGuess;
        this.actorA_ID = undefined; // actorID in actorList and id in actorArray
        this.actorB = undefined; //undefined until actor is selected from the list...
        this.actorB_ID = undefined; 
        this.movieID = undefined;
        this.actorList = []; // the list of actors in the movieGuess
        this.actorListID = undefined; // the one associated with the movieGuess
        this.movieVerified = false;

        this.init = this.init.bind(this);
        this.verifyMovie = this.verifyMovie.bind(this);
        this.presentActorsInMovie = this.presentActorsInMovie.bind(this);
    }

    /** 
     * @method - method to initialize the GameRound class, sets the actorA_ID, movieID, actorListID, and actorList properties
     * @returns {Object} - returns the GameRound instance
     */
    // async 
    init() {
        try {
            //? const thisMovie = this;
            this.actorA_ID = GameRound.getActor(this.actorA).id;
            const movieObject = GameRound.getMovie();
            this.movieID = movieObject.id;
            this.actorListID = movieObject.actorListID;
            this.actorList = GameRound.getActorList();
            return this;
        } catch (error) {
            console.error(error);
        }
    }

    /** 
    * @method - method to check if the movieGuess is a correct movie that actorA is in.
    */
    async verifyMovie() {
        try {
            const actorsInMovie = getMovieObjectByKey(this.actorListID);
            let found = false;
            for (let x = 0, max = actorsInMovie.length; x < max; x++) {
                let actor = actorsInMovie[x];
                if (actor.actorID === this.actorA) {
                    found = true;
                    break;
                }
            }
            this.movieVerified = found;
            return found;
        } catch (error) {
            console.error(error)
        }
    }

    /** 
    * @method - used to present the list of actors to choose from to the end user
    * @returns {Array.<Object>} - array of objects with actorID and name properties
    */
    async presentActorsInMovie() {
        try {
            const actorsInMovie = this.actorList;
            return actorsInMovie;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * @method - used to select the actorB from the list of actors in the movieGuess
     * @param {string} actorSelection - the actor name that was selected from the list of actors in the movieGuess
     */
    async selectActorFromMovie(actorSelection) {
        try {
            // so we dont need to check if the selection is in the list bc we presented them the list in the first place.. no write ins...
            this.actorB = actorSelection;
            this.actorB_ID = GameRound.getActor(actorSelection).id;
        } catch (error) {
            console.error(error);
        }
    }

    async complete(nextMovieGuess) { 
        // round completes when user inputs the next movie guess
        try {
            // make sure all the fields of this are defined
            if (Object.values(this).includes(undefined)) {
                throw new Error(`all fields of this GameRound instance are not defined`);
            } else {
                //? endRound(this)... this part needs work
                //* what do we want to do on complete?
                // set the future A stuff into the next round
                //!!!! PU HERE>>> save the round to ... context? db? hmmmmm
                const nextRound = new GameRound(this.actorB, nextMovieGuess);
                return nextRound;
            }
        } catch (error) {
            console.error(error);
        }
    }

    static getActor(actorName) { // may need to use this on the end side of round
        try {
            let actor = getActorByKey('name', actorName);
            if (actor === undefined) {
                throw new Error(`actorA is not found in actors array`);
            } else {
                return actor;
            }
        } catch (error) {
            console.error(error);
        }
    }

    static getMovie() { // may need to use this on the end side of round
        try {
            let movieObject = getMovieByKey('title', this.movieTitle);
            if (movieObject === undefined) {
                throw new Error(`movieTitle is not found in movies array`);
            } else {
                return movieObject;
            }
        } catch (error) {
            console.error(error);
        }
    }

    static getActorList() {
        try {
            const movieObject = getMovieObjectByKey('title', this.movieTitle);
            if (movieObject === undefined) {
                throw new Error(`movieTitle is not found in actorList array. something is off.`);
            } else {
                return movieObject.properties.actors;
            }
        } catch (error) {
            console.error(error);
        }
    }

}