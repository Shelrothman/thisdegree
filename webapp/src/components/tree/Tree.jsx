function Tree(props) {
    const { tree } = props;
    return (  
        <div>
            <div>
                {tree.treeDeclaration} ({tree.id})
                <br />
                by: {tree.postedBy.name}
            </div>
        </div>
    );
}

export default Tree;