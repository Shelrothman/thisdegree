import { GiRialtoBridge } from "react-icons/gi";
import RoadEdit from "../icons/RoadEdit";


// TODO modulate and remove repetition
function HeaderBridge() {
    return (
        <>
            <RoadEdit amount={3} />
            <GiRialtoBridge size={35} />
            <RoadEdit amount={3} />
        </>
    );
}

export default HeaderBridge;