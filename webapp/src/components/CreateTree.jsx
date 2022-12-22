import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

//* lets use a diff mutation for NOW that doesnt need auth since we dont have auth set up yet ui side
//TODO come back and change this to addTree once auth is set up
// const CREATE_TREE_MUTATION = gql`
// mutation PostMutation(
//     $treeDeclaration: String!
// ) {
//     addTree(treeDeclaration: $treeDeclaration) {
//         id
//         createdAt
//         treeDeclaration
//     }
// }`;
const CREATE_TREE_MUTATION = gql`
mutation PostMutation(
    $movieTitle: String!
) {
    addMovieAndCast(title: $movieTitle) {
        id
        castList
    }
}`;



const CreateTree = () => {
    // TODO: play with using a similar setup as this in my scoreboard inputs (state-wise)
    const [formState, setFormState] = useState({
        // treeDeclaration: '',
        // url: ''
        movieTitle: '',
    });
    // pass the CREATE_LINK_MUTATION to the useMutation hook 
    // and pass in the data provided in the input fields as variables.
    const [createTree] = useMutation(CREATE_TREE_MUTATION, {
        // 'createTree' is the destructure out a function that can be used to call the mutation
        variables: {
            // treeDeclaration: formState.description,
            movieTitle: formState.movieTitle,
        }
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
                        // value={formState.treeDeclaration}
                        value={formState.movieTitle}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                // treeDeclaration: e.target.value
                                movieTitle: e.target.value
                            })
                        }
                        type="text"
                        placeholder="A treeDeclaration for the tree"
                    />
                    {/* <input
                        className="mb2"
                        value={formState.url}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                url: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The URL for the link"
                    /> */}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateTree;