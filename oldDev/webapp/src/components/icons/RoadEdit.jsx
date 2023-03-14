import { MdOutlineEditRoad } from "react-icons/md";


function RoadEdit({ amount }) {
    return (
        <>
            {[...Array(amount)].map((e, i) => <span key={i}>
                <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
            </span>)}
        </>
    );
}

export default RoadEdit;