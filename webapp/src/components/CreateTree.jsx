import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

// ! user must be authenticated to post a tree

const CREATE_TREE_MUTATION = gql`
mutation PostMutation(
    $treeDeclaration: String!
) {
    addTree(treeDeclaration: $treeDeclaration) {
        id
        postedBy {
            id
            name
        }
        treeDeclaration
    }
}`;




const CreateTree = () => {
    const navigate = useNavigate();

    // TODO: play with using a similar setup as this in my scoreboard inputs (state-wise)
    const [formState, setFormState] = useState({
        treeDeclaration: '',
    });
    // pass the CREATE_TREE_MUTATION to the useMutation hook 
    // and pass in the data provided in the input fields as variables.
    // 'createTree' is the destructured function that can be used to call the mutation
    const [createTree] = useMutation(CREATE_TREE_MUTATION, {
        variables: {
            treeDeclaration: formState.treeDeclaration,
        },
        // TODO: PU HERE AND add logic to handle errors and handle response from posting a tree
        onCompleted: () => {
            navigate('/treehome');
        },
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createTree();
                }}
            >
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.treeDeclaration}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                // using the spread operator to keep the other values in the formState
                                treeDeclaration: e.target.value,
                            })
                        }
                        type="text"
                        placeholder="A treeDeclaration for the tree"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateTree;