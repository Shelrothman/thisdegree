/**
 * in here we keep track of the current game
 * TODO: eventually use redux for this once it gets bigger?
 * TODO: use MEMO to prevent re-rendering of components -- do more research on this
 * ? Optimizing with memo is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, memo is unnecessary. Keep in mind that memo is completely useless if the props passed to your component are always different, such as if you pass an object or a plain function defined during rendering. This is why you will often need useMemo and useCallback together with memo.
 */

// TODO: use the offificakl movie title in tree display

import {
    useState,
    useContext,
    createContext,
    useEffect,
    // ? memo
} from 'react';
import { useActorContext } from './ActorContext.jsx';
import uuid from 'react-uuid';
import Movie from '../models/Movie';

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
    const [formTypeMovie, setFormTypeMovie] = useState(true); // this should have been an object
    const [currentActorBridge, setCurrentActorBridge] = useState(actorA);
    const [previousActorBridge, setPreviousActorBridge] = useState('');
    const [previousMovieTitle, setPreviousMovieTitle] = useState('');
    const [decideMode, setDecideMode] = useState(false);
    // this is for the loading spinner
    const [dataLoading, setDataLoading] = useState(false);

    const [confirmModal, setConfirmModal] = useState({
        show: false,
        text: 'default',
        callback: () => { console.log('default confirm callback') },
    });
    // TODO PU HERE! now just need to do it for the prompts fpr the challenge

    // TODO this name should changle to challengePrompt yes
    const [challengePrompt, setChallengePrompt] = useState({
        show: false,
        // dont need the text in here just statebased on stuff.
        title: '',
        text: '',
        callback: () => { console.log('default prompt callback') },
        // other things
    });


    const [showAlert, setShowAlert] = useState({
        show: false,
        text: '',
        end: false,
        subtext: 'default',
        variant: 'primary',
        // handeling icon logic in the component based on this.text
    });
    const [wrongMovieInput, setWrongMovieInput] = useState(null);
    // TODO: this needs to change to setshowChallengeBTTon
    const [showChallenge, setShowChallenge] = useState(false);

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
        setWrongMovieInput(null);
        setShowAlert({
            show: false,
            text: '',
            end: false,
            subtext: '',
            variant: 'primary', // not needing this yet
        });
        setConfirmModal({
            show: false,
            text: 'default',
            callback: () => { console.log('default confirm callback') },
        });
        setChallengePrompt({
            show: false,
            title: '',
            text: '',
            callback: () => { console.log('default prompt callback') },
        });
        setShowChallenge(false);
        // setConfirmMode(false);
    };

    function handleCancelClick() {
        // setShowConfirm(false);
        // setConfirmText('default');
        setConfirmModal({
            show: false,
            text: 'default',
        });
        return;
    };

    async function addMovieToGlobal(userMovieInput, previousActorCharacterName, officialMovieTitle) {
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
            //
            ////////////////////////
            localMovieList.push(new Movie(uuid(), userMovieInput, currentActorBridge, previousActorCharacterName, officialMovieTitle));
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


    async function buildCastOptions(actorList = []) {
        try {
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
            console.log('finalTreeArray', finalTreeArray)
            return finalTreeArray;
        } catch (error) {
            console.error(error);
        }
    }

    function handleUniqueCheck(movieInput) {
        // check if the movie is already in the list
        // let currentMoviesInGame = movieList.map((movie) => movie.movieTitle);
        if (movieList === undefined || movieList.length === 0) {
            return true;
        }
        let unique = movieList.every((movie) => movie.movieTitle.toLowerCase() !== movieInput.toLowerCase());
        return unique;
    }

    // TODO: i think wer can move this function back in to FormContainer if its thew only component that uses it
    async function handleUndoLastRound() {
        try {
            setConfirmModal({
                show: false,
                text: 'default',
            })
            const removeRes = await removeMovieObjFromGlobal();
            if (removeRes) {
                // we are going back to the beginning of a new round 
                console.log('removed movie from global');
            }
            return;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <GameContext.Provider value={{
            gameStarted,
            setGameStarted,
            movieList,
            handleGameStateChange,
            addMovieToGlobal,
            handleNewActorGuess,
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
            handleCancelClick,
            handleUndoLastRound,
            confirmModal,
            setConfirmModal,
            dataLoading,
            setDataLoading,
            showChallenge,
            setShowChallenge,
            wrongMovieInput,
            setWrongMovieInput,
            gamePrompt: challengePrompt,
            setGamePrompt: setChallengePrompt,
        }}>
            {children}
        </GameContext.Provider>
    );
}