/**
 * sample version of a running scoreboard that will be present on the screen through.. one page app.. 
 * so it will dynamically change based on the user's selections
 * and based on what they do in the game
 * GREAT time to practice context API
 * 
 */
import { useActorContext } from '../contexts/ActorStartContext';


function Scoreboard() {
    const { actorA, actorB } = useActorContext();


    return (
        <>
            <div>
                Actor A: {actorA}
                <br />
                Actor B: {actorB}
            </div>
            <table className='float-right'>
                <thead>
                    <tr>
                        <th>Actor A</th>
                        <th>Actor B</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Actor A</td>
                        <td>Actor B</td>
                    </tr>
                </tbody>
            </table>
            <input type='text' onChange={(e) => selectActorA(e.target.value)} />
        </>
    );
}

export default Scoreboard;