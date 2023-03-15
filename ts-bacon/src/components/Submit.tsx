/**
 * this to do the setting
 */
import { useGameContext } from '../contexts/GameContext';
import Button from 'react-bootstrap/Button';
import { UnlockedCard } from '../models/UnlockedCard';
import { LockedCard } from '../models/LockedCard';


function Submit() {


    const { setLockedCards, setUnlockedCards } = useGameContext() as any;

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        alert('submitting');
        // stuff to check the answers...
        //
        // setLockedCards to be the current unlockedCards and one new one at the end
        setLockedCards((prevLockedCards: LockedCard[]) => {
            return [...prevLockedCards, new LockedCard('testActorName', 'testMovieName')];
            // * 4 now just using static values but will but in formData later once i get this visual thing working
        });

    }


    return (
        <Button variant="primary" onClick={handleSubmit}>
            Submit
        </Button>
    );
}

export default Submit;