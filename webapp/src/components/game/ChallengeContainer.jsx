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
import { useGameContext } from '../../contexts';
import ChallengeBtn from '../buttons/ChallengeBtn';

// addto the allerettt.. add tooltips to the buttons fo sho

// !!!!!!!!!!!!!!!!!!!!!!!!
//******** */ PU HERE!!!!



function ChallengeContainer() {

    const {
        showChallenge,
        setShowChallenge,

    } = useGameContext();


    const handleClick = () => {
        //!! IMPLEMENT THE CHALLENGE LOGIC!!!
        setShowChallenge(false);
    }


    return (
        <>
            {showChallenge ? (
                <ChallengeBtn handler={handleClick} />
            ) : null}
        </>
    );
}

export default ChallengeContainer;