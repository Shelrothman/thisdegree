import { GiCastle } from "react-icons/gi";

function Castle({ list = false }) {
    return (
        <>
            {list ? <GiCastle
                className='castle-li'
                size={35}
                style={{ borderRadius: '20%', padding: '1px' }}
            />
                : <GiCastle size={35} />}
        </>
    );
}

export default Castle;