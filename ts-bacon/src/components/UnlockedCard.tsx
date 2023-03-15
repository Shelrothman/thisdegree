// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { useGameContext } from '../contexts/GameContext';
import Submit from './Submit';

function UnlockedCardDiv({ actor, movie }: any = {}) {
    // start off empty since its unlocked

    return (
        <>
            <Card style={{
                backgroundColor: 'darkblue',
                border: '1px solid darkgreen',
            }}>
                <Card.Header>Before Lock</Card.Header>
                <Card.Body>
                    <Card.Title>Enter info:</Card.Title>
                    <div>
                        <label htmlFor="actor">Actor:</label>
                        <input type="text" id="actor" name="actor" />
                    </div>
                    <div>
                        <label htmlFor="movie">Movie:</label>
                        <input type="text" id="movie" name="movie" />
                    </div>
                    <Submit />
                </Card.Body>
            </Card>
        </>
    );
}

export default UnlockedCardDiv;