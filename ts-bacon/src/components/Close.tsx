import { ReactComponentElement, ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '../contexts/GameContext';

// TODO: the x button needs to coose ALL not just hthe one
// currently its only removing the last one

function Close({ round }: { round: number }) {
    //* so we already have another component that will react to changes in thelockedCards array.. ie will lessen if array is lesesns and increasd.. so here we just need logic to remove the item from the array that was clicked on AND all the items below it. aka all the items with a higher index 
    const { lockedCards, setLockedCards } = useGameContext() as any;
    function handleCloseClick(e: any) {
        const prevCards = [...lockedCards];
        // console.log(prevCards);
        const target: any = e.target;
        let indexPlace: number;
        if (target) {
            indexPlace = +(target.id) - 1;
        } else {
            // we should never get here but just in case
            return;
        }
        console.log("!!", indexPlace);
        const newCards = prevCards.slice(0, indexPlace);

        setLockedCards(newCards);
        return;
    }

    return (
        <Button
            className="close-btn"
            aria-label="Close"
            onClick={handleCloseClick}
            id={`${round}`}
        >
            &times;
        </Button>
    );
}

export default Close;