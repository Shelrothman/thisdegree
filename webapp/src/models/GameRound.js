/**
 * @class GameRound
 * @description- one round = starts with an actorA and a movie guess (verifyMovie) => moviTitle, 
 * then an actorB as the selection and complete(). 
 * then the next round: the old actorB is the new actorA and the new actorB is the new selection and so on.
 * @actorA and @actorB are the two actors that are being compared in this particular Game instance (not the overall a and b actors). just the particular comparison in the current round
 * @param {string} actorA - the last actor that was selected from the list of actors in previous round; 
 * ! keep the fetching and the checking/verifying logic all in here and other classes SO THAT we can just import the classes into components and use them without having to worry about the logic, reuseability, etc.
 * ! this is good bc IF the data structure (response) changes, we only have to change it in this one place and it will be reflected everywhere else
 */

import { getMovieByKey } from '../data/movies';
import { getActorByKey } from '../data/actors';
import getMovieObjectByKey from '../data/actorsInMovie';
import uuid from 'react-uuid';

export default class GameRound {
    constructor(actorA, movieGuess, lastRound = {}) {
        this.actorA = actorA;
        this.movieTitle = movieGuess;
        this.actorA_ID = undefined; // actorID in actorList and id in actorArray
        this.actorB = undefined; //undefined until actor is selected from the list...
        this.actorB_ID = undefined;
        this.movieID = undefined;
        this.actorList = []; // the list of actors in the movieGuess
        this.actorListID = undefined; // the one associated with the movieGuess
        this.movieVerified = false;
        this.lastRound = lastRound; // the last rounds GameRound instance, will be empty if its the first round
        this.movieUUID = uuid();

        this.init = this.init.bind(this);
        this.verifyMovie = this.verifyMovie.bind(this);
        this.presentActorsInMovie = this.presentActorsInMovie.bind(this);
        this.setActorFromSelection = this.setActorFromSelection.bind(this);
        this.complete = this.complete.bind(this);
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
            const movieObject = GameRound.getMovie(this.movieTitle);
            this.movieID = movieObject.id;
            this.actorListID = movieObject.actorListID;
            this.actorList = GameRound.getActorList(this.movieTitle);
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
            // TODO add check in here if movies already been guessed, return false if it has
            const actorsInMovie = this.actorList;
            let found = false;
            for (let x = 0, max = actorsInMovie.length; x < max; x++) {
                console.log(x)
                let actor = actorsInMovie[x];
                if (actor.actorID === this.actorA_ID) {
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
     * 
     * TODO make naming more clear
     */
    async setActorFromSelection(actorSelection) {
        try {
            //!! so we dont need to check if the selection is in the list bc we presented them the list in the first place.. no write ins...
            this.actorB = actorSelection;

        
            this.actorB_ID = GameRound.getActor(actorSelection).id || undefined;
            return this;
        } catch (error) {
            console.error(error);
        }
    }

    /** round completes when user inputs the next movie guess */
    async complete(nextMovieGuess) {
        try {
            // const thisRound = this;
            // console.log(this);
            // Object.values(this).forEach((value) => {
            //     console.log(value)
            // })
            // make sure all the fields of this are defined
            if (this.actorB_ID === undefined) {

                throw new Error(`all fields of this GameRound instance are not defined, so something needs to be addressed, likely within GameRound class`);
            } else {
                //? endRound(this)... this part needs work
                // bc we want to have it all in a big object so that at the end of the game we can just look at the big object to assess the display...
                // it wouldnt continue if the middles dont work
                // use the big object at the end to build the final bridge/tree/node thing to present to the user when they win
                const nextRound = new GameRound(this.actorB, nextMovieGuess, this);
                // nextRound.lastRound = this; // set the last round of the new round to this round
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
                // throw new Error(`actorA is not found in actors array`);
                return {};
            } else {
                return actor;
            }
        } catch (error) {
            console.error(error);
        }
    }

    static getMovie(movieTitle) { // may need to use this on the end side of round
        try {
            // console.log('this.movieTitle', this.movieTitle)

            let movieObject = getMovieByKey('title', movieTitle);
            // if (movieObject === undefined) {
                // throw new Error(`movieTitle is not found in movies array`);
            // } else {
                return movieObject || {};
            // }
        } catch (error) {
            console.error(error);
        }
    }

    static getActorList(movieTitle) {
        try {
            const movieObject = getMovieObjectByKey('title', movieTitle);
            // if (movieObject === undefined) {
                // throw new Error(`movieTitle is not found in actorList array. something is off.`);
            // } else {
                return movieObject?.properties?.actors || [];
            // }
        } catch (error) {
            console.error(error);
        }
    }

}