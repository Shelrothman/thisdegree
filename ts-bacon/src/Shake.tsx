import { useRef } from "react";
import { useEffect } from "react";

/**
 * @function shake
 * we use the useRef hook to reference the div element  
 * and we assert that divRef.current is not null before passing it to the shake function through the event listener in the useEffect 
 * the shake function shakes the element passed to it for 3 seconds
 */

/** this shows how one cud use this function */
export default function Shaken() {

    const divRef = useRef<HTMLDivElement>(null);

    function shake() {
        divRef.current!.classList.add("shaking");
        // Remove the shaking class after 3 seconds
        setTimeout(() => {
            // use the '!' to assert that divRef.current is not null
            divRef.current!.classList.remove("shaking");
        }, 2500);
    }

    // ! this is pretty coo tho nbc this sis how i could uyseRef for other things ya like save this
    // ! use this when needed in ref
    // useEffect(() => {
    //     if (divRef.current) {
    //         divRef.current.addEventListener("click", () => shake(divRef.current!, 50, 10));
    //         // divRef.current.addEventListener("click", () => handleShake(divRef.current!));
    //     }
    // }, []);

    return <div ref={divRef} style={{ backgroundColor: 'green' }} onClick={shake}>Click me to shake!</div>;
}


