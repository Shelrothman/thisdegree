import { gql } from "@apollo/client";

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

export default CREATE_TREE_MUTATION;