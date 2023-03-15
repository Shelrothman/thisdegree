// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { useGameContext } from '../contexts/GameContext';
import Submit from './Submit';

function LockedCardDiv({ actor, movie }: any) {
    // const [locked, setLocked] = useState(false);


    return (
        <>
            <Card style={{
                backgroundColor: 'green',
            }}>
                <Card.Header>After Lock</Card.Header>
                <Card.Body>
                    <Card.Title>Info Saved</Card.Title>
                    <div>
                        <label htmlFor="actor">Actor:</label>
                        <input type="text" id="actor" name="actor" readOnly />
                    </div>
                    <div>
                        <label htmlFor="movie">Movie:</label>
                        <input type="text" id="movie" name="movie" readOnly />
                    </div>
                    <Submit />
                </Card.Body>
            </Card>
        </>
    );
}

export default LockedCardDiv;