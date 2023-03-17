import Button from 'react-bootstrap/Button';
import { useGameContext } from '../contexts/GameContext';


function Close() {
    // so we already have another component that will react to changes in thelockedCards array.. ie will lessen if array is lesesns and increasd.. so here we just need logic to remove the item from the array that was clicked on AND all the items below it. aka all the items with a higher index 
    const { lockedCards, setLockedCards } = useGameContext() as any;


    function handleCloseClick() {
        const prevCards = [...lockedCards];
        console.log('sanity')
        const newCards = prevCards.slice(0, prevCards.length - 1);

        setLockedCards(newCards);
        return;
    }

    return (
        <Button
            className="close-btn"
            aria-label="Close"
            onClick={handleCloseClick}
        >
            &times;
        </Button>
    );
}

export default Close;