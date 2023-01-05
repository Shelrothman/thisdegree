import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import CREATE_TREE_MUTATION from '../../queries/createTreeMutation';
import DataTree from './DataTree';

// ! user must be authenticated to post a tree




const CreateTree = () => {
    const navigate = useNavigate();

    // use the useLocation hook to get the state from the previous page
    const { state } = useLocation();
    console.log('state: ', state);

    const [treeObject, setTreeObject] = useState(JSON.parse(state.tree));
    console.log('treeObject: ', treeObject)
    console.log(typeof treeObject);

    // TODO: play with using a similar setup as this in my scoreboard inputs (state-wise)
    const [formState, setFormState] = useState({
        treeDeclaration: state.tree,
        // treeDeclaration: 'test tree declaration',
        // !!! using hard value for now for testing. return and update thus
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
        onError: (error) => {
            console.log('error: ', error);
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
                <div className="flex flex-column mt-3">
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
                <pre style={{ whiteSpace: 'pre-wrap' }} >
                        {JSON.stringify(JSON.parse(state.tree), null, 2)}
                </pre>
                <DataTree treeData={treeObject} />
            </form>
        </div>
    );
};

export default CreateTree;