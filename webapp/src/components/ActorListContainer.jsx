import { useState, useEffect } from 'react';
import { useActorContext } from '../contexts/ActorContext';
import { BiRefresh } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    // getAllActors,
    getFiftyRandomActors
} from '../data/actors';
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
        getFiftyRandomActors().then((actors) => {
            // console.log(actors);
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

    function handleRefresh() {
        getFiftyRandomActors().then((actors) => {
            // console.log(actors);
            setActorList(actors);
        });
    }

    return (
        <>
            <Button onClick={handleRefresh}>
                <BiRefresh size={25} /> Refresh List
            </Button>
            <Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                    {actorListItems}
                </ListGroup>
            </Card>
        </>
    );
}

export default ActorListContainer;