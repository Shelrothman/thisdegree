import { GiRialtoBridge } from "react-icons/gi";

import { MdOutlineEditRoad } from "react-icons/md";


// TODO modulate and remove repetition
function HeaderBridge() {
    return (
        <>
            <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
            <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
            <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
            <GiRialtoBridge size={35} />
            <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
            <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
            <MdOutlineEditRoad size={20} style={{ transform: 'rotate(-90deg) ' }} />
        </>
    );
}

export default HeaderBridge;