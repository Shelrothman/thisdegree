/**
 * this component to nbe the parent of the challenge button
 * the button in which triggers the logic for trhe user to challenge the result  of a wrong  evaluation
 * ya know what. it should LIVE on the modals, like on the wrong evaluation modal? or make it get ENABLED when a wrong happens 
 * TODO addd to context that wrongFlag
 */
import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../contexts';

// addto the allerettt

function ChallengeBtn() {

    const {
        showChallenge,
        setShowChallenge,
    } = useGameContext();


    const handleClick = () => {
        setShowChallenge(false);
    }

// TODO modulate out the literal button to its own component so this is more a holder/parwent with logic

    return (
        <>
            {showChallenge ? (
                <Button variant='warning' onClick={handleClick}>
                    Challenge
                </Button>
            ) : null
            }
        </>
    );
}

export default ChallengeBtn;