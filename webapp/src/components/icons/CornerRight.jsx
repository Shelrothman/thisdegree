import { TbCornerRightUpDouble } from 'react-icons/tb'

function Castle({ level }) {
    return (
        <>
                <TbCornerRightUpDouble
                    className='bridge-li'
                    size={35}
                    style={{
                        transform: 'rotate(90deg)',
                        margin: '5px',
                        borderRadius: '18%',
                        backgroundColor: (level % 2 === 0) ? 'rgb(141, 66, 245)' : 'rgb(38, 140, 121)',
                    }}
                />
        </>
    );
}

export default Castle;