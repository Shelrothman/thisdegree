import React, { useState } from 'react';

// Data tree node component
const Node = ({ data, depth = 0 }) => {
    // Create a reference to the current node's children
    const [children, setChildren] = useState(data.children || []);

    // Function to toggle the visibility of the node's children
    const toggle = () => {
        setChildren(prevChildren => {
            if (prevChildren.length === 0) {
                // If the node has no children, fetch the children from the server
                fetchChildren(data.id).then(setChildren);
            } else {
                // If the node has children, clear the children
                return [];
            }
        });
    };

    // Render the node with a toggle button and its children
    return (
        <div style={{ marginLeft: `${depth * 20}px` }}>
            <button onClick={toggle}>{data.name}</button>
            {children.map(child => (
                <Node data={child} depth={depth + 1} />
            ))}
        </div>
    );
};

// Data tree component
const DataTree = () => {
    // Create a reference to the root node of the data tree
    const [root, setRoot] = useState(null);

    // Fetch the root node from the server
    useEffect(() => {
        fetchRoot().then(setRoot);
    }, []);

    // Render the data tree
    return (
        <div>
            {root && <Node data={root} />}
        </div>
    );
};
