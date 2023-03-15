
import { v4 as uuidv4 } from 'uuid';




export class LockedCard {
    // movieInput: string;
    movie: string;
    actor: string;
    id: string;

    constructor(movie: string, actor: string) {
        // this.movieInput = movieInput;
        this.movie = movie;
        this.actor = actor;
        this.id = uuidv4();
    }
}