import { useState, useEffect } from 'react';
import { useActorContext } from '../contexts/ActorContext';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import getAllActors from '../data/actors';
// import { useActorStart } from '../contexts/ActorStartContext';
/**
 * in here we need to fetch the actors from the db
 * and then render them in a list with actions to select them
 * for now just hardcoded
 */



function ActorListContainer() {
    const [actorList, setActorList] = useState([]);

    const { actorA, actorB, handleActorSelection } = useActorContext();


    useEffect(() => {
        getAllActors().then((actors) => {
            setActorList(actors);
        });
    }, []);

    useEffect(() => {
        // remove the selected actors from the list displayed
        setActorList(actorList.filter((actor) => actor.name !== actorA && actor.name !== actorB));
    }, [actorA, actorB]);

    function handleSelection(actor) {
        handleActorSelection(actor);
    }



    const actorListItems = actorList.map((actor) => {
        return (
            <ListGroup.Item
                onClick={() => handleSelection(actor.name)}
                key={actor.id}
                className='actorItem-holder'
                style={{ cursor: 'pointer' }}
            >
                <a id={`${actor.id}-btn`} className='actor-item' >
                    {actor.name}
                </a>
            </ListGroup.Item>
        );
    });

    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                {actorListItems}
            </ListGroup>
        </Card>
    );
}

export default ActorListContainer;