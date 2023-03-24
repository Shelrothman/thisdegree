import Button from 'react-bootstrap/Button';
import { useGameContext } from '../../contexts/GameContext';
import React from 'react';


function Start() {
    const { globalGame, setGlobalGame } = useGameContext() as any;

    const handleStartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setGlobalGame({ ...globalGame, gameStarted: true });
    };

    return (
        <>{
            !globalGame.gameStarted &&
            <>
            <small>selects two actors and then: </small>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleStartClick}
                    disabled={!globalGame.selectedA && !globalGame.selectedZ}
                >

                    Start
                </Button>
            </>
        }</>
    );
}

export default Start;