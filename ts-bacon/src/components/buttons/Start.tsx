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
            <Button variant="primary" type="submit" onClick={handleStartClick}>
                Start
            </Button>
        }</>
    );
}

export default Start;