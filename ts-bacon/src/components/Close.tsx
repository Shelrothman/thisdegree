import Button from 'react-bootstrap/Button';
import { useGameContext } from '../contexts/GameContext';



function Close({ round }: { round: number }) {
    //* already have another component that will react to changes in thelockedCards array
    const { lockedCards, setLockedCards } = useGameContext() as any;
    function handleCloseClick(e: any) {
        const prevCards = [...lockedCards];
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