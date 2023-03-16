// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGameContext } from '../contexts/GameContext';
import Submit from './Submit';

function UnlockedCardDiv({ actor, movie }: any = {}) {
    // start off empty since its unlocked
    const {
        // setLockedCards, 
        // setUnlockedCards, 
        globalFormState,
        setGlobalFormState,
    } = useGameContext() as any;

    return (
        <>
            <Card style={{
                backgroundColor: 'darkblue',
                border: '1px solid darkgreen',
            }}>
                <Card.Header>Enter Info: </Card.Header>
                <Card.Body>
                    {/* <Card.Title>Enter info:</Card.Title> */}
                    <div>
                        <label htmlFor="actor">Actor:</label>{' '}
                        <select
                            // type="text"
                            id="actor"
                            name="actor"
                            value={globalFormState.actor}
                            onChange={(e) => {
                                setGlobalFormState({
                                    ...globalFormState,
                                    actor: e.target.value,
                                })
                            }}
                        >
                        <option value="...">...</option>
                        <option value="Tom Cruise">Fake Cruise</option>
                        <option value="Tom Hanks">Tom Fanks</option>
                        <option value="Tom Hardy">Julia Fakerts</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="movie">Movie:</label>{' '}
                        <input
                            type="text"
                            id="movie"
                            name="movie"
                            value={globalFormState.movie}
                            onChange={(e) => {
                                setGlobalFormState({
                                    ...globalFormState,
                                    movie: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <Submit />
                </Card.Body>
            </Card>
        </>
    );
}

export default UnlockedCardDiv;