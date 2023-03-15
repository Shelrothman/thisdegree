import { useRef } from "react";
// import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";


/**
 * @function ShakeIt
 * shakes the child element passed to it
 */
function ShakeIt({ child }: any) {
    const { setShakeInitiated } = useGameContext() as any;
    const divRef = useRef<HTMLDivElement>(null);

    function shake() {
        divRef.current?.classList.add("shaking");
        // Remove the shaking class after 2 seconds
        setTimeout(() => {
            // ? use the '!' to assert that divRef.current is not null
            divRef.current?.classList.remove("shaking");
            // then we set the shakeInitiated to false
            setShakeInitiated(false);
        }, 2000);
    }



    return (
        <div ref={divRef} onClick={shake}>
            {child}
        </div>
    )
}

export default ShakeIt;
