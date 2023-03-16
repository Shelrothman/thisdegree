


export default function shake(
    divRef: React.MutableRefObject<HTMLDivElement | null>,
    setShakeInitiated: React.Dispatch<React.SetStateAction<boolean>>
) {
    divRef.current?.classList.add("shaking");
    // Remove the shaking class after 2 seconds
    setTimeout(() => {
        divRef.current?.classList.remove("shaking");
        // then we set the shakeInitiated to false
        setShakeInitiated(false);
    }, 2000);
}