import { useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useGameContext } from '../contexts/GameContext';
import Submit from './Submit';
import { v4 as uuidv4 } from 'uuid';

// TODO obviously this is just a placeholder for now
const testActors = ["Fake Cruise", "Tom Fanks", "Julia Fakerts", "Angelina Fakie", "Leonardo DiCaprico", "Sandra Bullocky", "Brad Pitiful", "Meryl Streepish", "Johnny Depressed", "Nicole Fakeman"];
// TODO  make a 'select from currentMovie' title thang */}
function UnlockedCardDiv({ actor, movie, round }: any = {}) {
    // start off empty since its unlocked
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        shakeInitiated,
        globalFormState,
        setGlobalFormState,
    } = useGameContext() as any;

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    });

    const selectOptions = testActors.map((actor: string) => {
        return <option value={actor} key={uuidv4()}>{actor}</option>
    });

    const formControlProps = (x: string) => {
        return {
            disabled: shakeInitiated,
            id: x,
            name: x,
            value: globalFormState[x],
            onChange: (e: any) => {
                setGlobalFormState({
                    ...globalFormState,
                    [x]: e.target.value,
                })
            }
        }
    };


    return (
        <Card className="unlocked-card">
            <Card.Header>Round {round}:</Card.Header>
            <Card.Body>
                <div>
                    <label htmlFor="actor">Actor:</label>{' '}
                    <Form.Select {...formControlProps('actor')}>
                        <option value="default">...</option>
                        {selectOptions}
                    </Form.Select>
                </div>
                <div>
                    <label htmlFor="movie">Movie:</label>{' '}
                    <Form.Control {...formControlProps('movie')} ref={inputRef} />
                </div>
                <Submit />
            </Card.Body>
        </Card>
    );
}

export default UnlockedCardDiv;