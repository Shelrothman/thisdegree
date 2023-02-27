/**
 * this component to nbe the parent of the challenge button
 * a holder/parwent with logic to show the button or not and to trigger sending the challenge query
 * the button in which triggers the logic for trhe user to challenge the result  of a wrong  evaluation
 * TODO addd to context that wrongFlag
 * 
 * 
 ** input ChallengeValidationInput {
 **   id: ID!
 **   officialTitle: String # yea the client will be able to send this back.
 **   originalInput: String!
 **   reason: String! # only to be either "invalidMovieInput" or "actorUnfound"
}
 * 
 */
// import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts';
// import { useChallengeValidation } from '../../hooks/useGQLclient';
// import ChallengeForm from './form/ChallengeForm';
import ChallengeBtn from '../buttons/ChallengeBtn';

// addto the allerettt.. add tooltips to the buttons fo sho

// !!!!!!!!!!!!!!!!!!!!!!!!
//******** */ PU HERE!!!!

// i am being more reacty./..

function ChallengeContainer() {
    const {
        showChallenge,
        setShowChallenge,
        movieList,
        setDataLoading,
        showAlert,
        wrongMovieInput,
        // setWrongMovieInput, // TODO this needs to roll back at somepoint?? or na?
        // gamePrompt,
        setGamePrompt: setChallengePrompt,
        setShowAlert,
        currentActorBridge,
    } = useGameContext();

    const [challengeInput, setChallengeInput] = useState({
        id: '',
        officialTitle: '',
        originalInput: JSON.stringify({
            title: wrongMovieInput,
            actor: '',
        }),
    });

    // const [showChallengeForm, setShowChallengeForm] = useState(true);

    //* derp it has to be at least 1 in there or else tehre isnt antything to send....
    // bc of how i set it up.. and thats the ty yea hold up i still gotsss wauyy more things to set up and stuff im forgetting the logic form the api is like new and io need to implement...
    // lets just focus on the display for now


    useEffect(() => {
        if (movieList.length === 0) {
            // wont get filled if anything jacked up
            return;
        } else {
            setChallengeInput({
                id: movieList[0]?.id,
                officialTitle: movieList[0]?.officialMovieTitle,
                originalInput: JSON.stringify({
                    title: movieList[0]?.movieTitle,
                    actor: movieList[0]?.actorSelection.name,
                    // movie_ID: movieList[0]?.movie_ID
                }),
            });
        }
    }, [movieList]);

    // useEffect(() => {
    //     if (!showChallenge) {
    //         setShowChallengeForm(true);
    //     } else {
    //         setShowChallengeForm(false);
    //     }
    // }, [showChallenge]);

    // const {
    //     data,
    //     isLoading,
    //     // error: isQueryError,
    //     refetch,
    //     isFetching
    // } = useChallengeValidation(challengeInput);

    // useEffect(() => {
    //     if (isFetching) {
    //         setDataLoading(true);
    //     }
    //     if (!isFetching) {
    //         setDataLoading(false);
    //     }
    // }, [isFetching]);


    // ** alrei9ght so need to revieve the anser toi the REASON WHY wringgggg
    const handleClick = () => {
        //!! IMPLEMENT THE CHALLENGE LOGIC!!!
        // create the object to send to the backend


        // loading will display...
        // and then we want another dispplay to appear once we have the results to the quewry...

        // and then the prompt handdles the below two options:: dependoing on which will depend on its display.

        setChallengePrompt({
            show: true,
            title: 'Challenge Time',
            text: `Re-enter the movie title that you believe connects to ${currentActorBridge}`
            // subtext: 'Enter the movie title and actor name',
        });
        setShowAlert({
            ...showAlert,
            show: false,
        });
        //! so first we try the "challenge attempt" by giving user entering new input.. (gives user a chance to do a different spelling or something)


        //! and THEN::: yes this was my intentiona.. THEN after that, the response comes back and if that reason.. (which matches the alert subtext)
        if (showAlert.subtext === 'Invalid Movie Input') { // or another way of signifying
// ** derp go do all this inchalelnge form yes
            // no movies found in Global Movie DB that match `${movieTitle}`
            // new input:
            // <GamePrompt>
            // form input and ok or cancle
            // and then send the challenge validation with THOSE inputs put in in the GamePRompt
        } else if (showAlert.subtext === 'notfound') {
            // and then display the list of other movies they could have chosen

            // const challengeInput = {
            // send the challenge query
            // display the 'sending challenge'
            // depending on the response: either: invlaid movie or not in movie...
            // if invalid: display the otpions for that
            // else, display the list of other movies they cud have chosen



            // this just removes the challenge btn right now
            setShowChallenge(false);
            // this will show the challenge form
            // setShowChallengeForm(true);


        }
    }


    return (
        <>
            {showChallenge ? (
                // <ChallengeBtn handler={refetch} />
                <ChallengeBtn handler={handleClick} />
            ) : null}
        </>
    );
}

export default ChallengeContainer;