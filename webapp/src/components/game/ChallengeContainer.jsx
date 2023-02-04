/**
 * this component to nbe the parent of the challenge button
 * a holder/parwent with logic to show the button or not and to trigger sending the challenge query
 * the button in which triggers the logic for trhe user to challenge the result  of a wrong  evaluation
 * ya know what. it should LIVE on the modals, like on the wrong evaluation modal? or make it get ENABLED when a wrong happens 
 * TODO addd to context that wrongFlag
 */
// import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../contexts';
import ChallengeBtn from '../buttons/ChallengeBtn';

// addto the allerettt

function ChallengeContainer() {

    const {
        showChallenge,
        setShowChallenge,
    } = useGameContext();


    const handleClick = () => {
        setShowChallenge(false);
    }


    return (
        <>
            {showChallenge ? (
                <ChallengeBtn handler={handleClick} />
            ) : null
            }
        </>
    );
}

export default ChallengeContainer;