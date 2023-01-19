/**
 * in here we keep track of the current game
 * TODO: eventually use redux for this once it gets bigger?
 * TODO: use MEMO to prevent re-rendering of components -- do more research on this
 * ? Optimizing with memo is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, memo is unnecessary. Keep in mind that memo is completely useless if the props passed to your component are always different, such as if you pass an object or a plain function defined during rendering. This is why you will often need useMemo and useCallback together with memo.
 */


import {
    useState,
    useContext,
    createContext,
    useEffect,
    // ? memo
} from 'react';
import { useActorContext } from './ActorContext.jsx';
import uuid from 'react-uuid';


const GameContext = createContext();


export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }) {
    const [gameStarted, setGameStarted] = useState(false);
    const {
        actorA,
        actorB
    } = useActorContext();
    // this is the movie title of current movie
    const [currentMovieTitle, setCurrentMovieTitle] = useState('');

    // the movieList to hold the whole tree
    const [movieList, setMovieList] = useState([]);
    // const [readyToBridge, setReadyToBridge] = useState(false);
    const [currentActorOptions, setCurrentActorOptions] = useState([]);

    // only ready if there are movies in the list
    const [readyToBuild, setReadyToBuild] = useState(movieList.length > 0);

    // if false, then enable the actor form, if true, then enable the movie form
    const [formTypeMovie, setFormTypeMovie] = useState(true);
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);

    const [previousActorBridge, setPreviousActorBridge] = useState('');
    const [previousMovieTitle, setPreviousMovieTitle] = useState('');

    const [decideMode, setDecideMode] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false); // for the visual 
    const [confirmText, setConfirmText] = useState('default');
        


    // const [confirmMode, setConfirmMode] = useState(false);


    const [showAlert, setShowAlert] = useState({
        show: false,
        text: '',
        end: false,
        subtext: 'default',
        // variants: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
        variant: 'primary',
    });
    //!!!! PU HERE!  do this for all the others amnd shiz.. hold the state of all teh modals in here then render in Launcher .. customize in individual components

    // objv i aint the first to have iussues with confirm i wma= seeing now...

    useEffect(() => {
        if (actorA) {
            setCurrentActorBridge(actorA);
        }
    }, [actorA]);



    useEffect(() => {
        console.table(movieList);
        console.log('currentMovieTitle', currentMovieTitle);
        console.log('currentActorBridge', currentActorBridge);
    }, [movieList, currentMovieTitle, currentActorBridge]);



    /**use this to change the game on and off, dont use this for when a game wins (only when looses)  */
    const handleGameStateChange = () => {
        // all the resets to happen when the game is over through loosing or starts over
        setGameStarted(false);
        // setActorA('');
        setReadyToBuild(false);
        setMovieList([]);
        setCurrentMovieTitle('');
        setCurrentActorBridge(actorA);
        setFormTypeMovie(true);
        setPreviousActorBridge('');
        setPreviousMovieTitle('');
        setShowAlert({
            show: false,
            text: '',
            end: false,
            subtext: '',
            variant: 'primary', // not needing this yet
        });
        // setConfirmMode(false);
    };

    async function addMovieToGlobal(userMovieInput, previousActorCharacterName) {
        try {
            if (currentMovieTitle !== '') {
                // set the previous movie to the current one before we change it
                setPreviousMovieTitle(currentMovieTitle);
            }
            setCurrentMovieTitle(userMovieInput);
            // set readyToBuild on the first time only: 
            if (!readyToBuild) setReadyToBuild(true);
            let localMovieList = movieList || [];
            // add the movie guess to the end of array 
            // TODO: maybe use like Object.assign or something ES6y here?
            localMovieList.push({
                id: uuid(),
                movieTitle: userMovieInput,
                previousActor: {
                    name: currentActorBridge,
                    characterName: previousActorCharacterName
                },
                actorGuessed: false,
                actorSelection: {
                    id: '',
                    name: '...', // this is nice for the user in the ui
                    characterName: '',
                },
            });
            // set it to true after a movie is added (sets to false in the formContainer/ actorForm)
            setDecideMode(true);
            setMovieList(localMovieList);
            setFormTypeMovie(false);
            return true; // return true if the movie was added
        } catch (error) {
            console.error(error);
            return false; // return false if the movie couldnt be added
        }
    }


    async function removeMovieObjFromGlobal() {
        try {
            // set currentMovie Title to the title from the last movieTitle
            // if (previousMovieTitle !== '')
            console.log(`attempting to remove ${currentMovieTitle}-object from global...`);
            console.log('previousActorBridge', previousActorBridge);
            // there will be a movie to set BC the button does not appear until there is a movie, so set the currentActorBridge to it no matter what bc if its empty, then that is what it should be at that point
            setCurrentMovieTitle(previousMovieTitle);
            //! not until there is a selection made is the previousActorBridge set, so if back is clicked in actorMode then the previousACTOR has not been set yet.
            setCurrentActorBridge(movieList[movieList.length - 1].previousActor.name);
            let localMovieList = movieList;
            let indexToRemove = localMovieList.length - 1;
            localMovieList.splice(indexToRemove, 1);

            // so the back button goes away
            setReadyToBuild(false);

            // so the ui goes back/stays to the movie input
            setFormTypeMovie(true);
            // set the global movieList to the new one
            setMovieList(localMovieList);
            // return true if the movie obj was removed
            return true;
        } catch (error) {
            console.error(error);
            return false; // return false if the movie couldnt be removed
        }
    }


    async function buildCastOptions(movieEvaluationObject) {
        try {
            // setCurrentMovieTitle(userMovieGuess); //! moved this into above function
            let actorList = movieEvaluationObject.data.validateMovieInput?.cast || [];
            // console.log('actorList: ', actorList); // debug

            //* Filter out the actors that are already in the game
            let currentActorsInGame = [actorA.toLowerCase(), ...movieList.map((movie) => movie.actorSelection.name.toLowerCase())];
            console.log('currentActorsInGame: ', currentActorsInGame); // debug                        
            let actorOptions = actorList.filter((actor) => !currentActorsInGame.includes(actor.name.toLowerCase()));
            // console.log('actorOptions: ', actorOptions); // debug

            setCurrentActorOptions(actorOptions);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const handleNewActorGuess = async (userActorInput, movie, characterName) => {
        try {
            console.log('userActorInput', userActorInput);
            // TODO use movieID instead of title to make this more reliable

            let localMovieObj = movieList[movieList.length - 1];
            // remove the movie from movieList and then setMovieList to that new list SO THAT we can replace it at the end of this function
            setMovieList(movieList.filter((movieObj) => movieObj.movieTitle !== movie));
            localMovieObj.actorGuessed = true;
            localMovieObj.actorSelection.name = userActorInput;
            localMovieObj.actorSelection.id = uuid();
            // TODO use the id of the actor from the api? or remove this bc we may not need it
            localMovieObj.actorSelection.characterName = characterName;

            setMovieList((prev) => {
                return [...prev, localMovieObj];
            });
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * @function handleActorSelection  - sets currentActorBridge to the userSelection and then calls handleNewActorGuess which update the global movie list based on the userSelection/actor/options
     */
    async function handleActorSelection(userSelection, characterName) {
        try {
            if (currentActorBridge !== '') {
                // set the previous actor bridge to the current actor bridge before we change it
                setPreviousActorBridge(currentActorBridge);
            }
            setCurrentActorBridge(userSelection);
            await handleNewActorGuess(userSelection, currentMovieTitle, characterName);
            setFormTypeMovie(true);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function handleFinalBridge(characterName) {
        try {
            let finalTreeArray = [];
            let res = await handleActorSelection(actorB, characterName);
            if (res) {
                finalTreeArray = movieList;
            }
            // unshift the actorA to beginning of the array
            // finalTreeArray.unshift({
            //     startingActor: actorA,
            //     id: uuid(),
            // }); //! may end up not needing either of these
            // // push the actorB to the end of the array
            // finalTreeArray.push({
            //     endingActor: actorB,
            //     id: uuid(),
            // });
            console.log('finalTreeArray', finalTreeArray)
            return finalTreeArray;
        } catch (error) {
            console.error(error);
        }
    }

    function handleUniqueCheck(movieInput) {
        // check if the movie is already in the list
        // let currentMoviesInGame = movieList.map((movie) => movie.movieTitle);
        if (movieList.length === 0) {
            return true;
        }
        let unique = movieList.every((movie) => movie.movieTitle.toLowerCase() !== movieInput.toLowerCase());
        return unique;
    }


    return (
        <GameContext.Provider value={{
            gameStarted,
            setGameStarted,
            movieList,
            handleGameStateChange,
            addMovieToGlobal,
            handleNewActorGuess,
            // readyToBridge,
            // setReadyToBridge,
            currentActorBridge,
            setCurrentActorBridge,
            currentMovieTitle,
            setCurrentMovieTitle,
            currentActorOptions,
            setCurrentActorOptions,
            handleActorSelection,
            handleUniqueCheck,
            buildCastOptions,
            readyToBuild,
            setReadyToBuild,
            formTypeMovie,
            setFormTypeMovie,
            actorA,
            actorB,
            handleFinalBridge,
            removeMovieObjFromGlobal,
            decideMode,
            setDecideMode,
            showAlert,
            setShowAlert,
            showConfirm,
            setShowConfirm,
            confirmText,
            setConfirmText,
            // confirmMode,
            // setConfirmMode,
        }}>
            {children}
        </GameContext.Provider>
    );
}