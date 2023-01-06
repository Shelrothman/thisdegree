import { GiRialtoBridge } from "react-icons/gi";

function RoyalBridge({ vertical = false }) {
    return (
        <>
            {vertical ? <GiRialtoBridge
                size={45}
                className='bridge-castle-li'
                style={{
                    transform: 'rotate(90deg)',
                    marginTop: '10px',
                    marginBottom: '10px',
                    backgroundColor: 'rgb(69, 40, 3)',
                    borderRadius: '18%',
                }}
            />
                : <GiRialtoBridge size={35} />}
        </>
    );
}

export default RoyalBridge;