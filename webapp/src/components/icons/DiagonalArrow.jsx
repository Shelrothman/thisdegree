import { CgArrowsExpandDownRight } from "react-icons/cg";

function DiagonalArrow({ level }) {
    return (
        <>
            <CgArrowsExpandDownRight
                className='arrow-li' size={28}
                style={{
                    transform: 'rotate(90deg)',
                    marginBottom: '15x',
                    borderRadius: '18%',
                    backgroundColor: (level % 2 === 0) ? 'rgb(38, 140, 121)' : 'rgb(141, 66, 245)',
                }}
            />
        </>
    );
}

export default DiagonalArrow;