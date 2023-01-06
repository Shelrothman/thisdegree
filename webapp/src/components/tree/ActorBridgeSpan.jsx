function ActorBridgeSpan({ identifier, actor }) {
    return (
        <span className={identifier === 'a' ? 'actors-span-a' : 'actors-span-b'}>
            <strong>{actor.name}</strong>
            &nbsp;
            ({actor.characterName})
        </span>
    );
}

export default ActorBridgeSpan;