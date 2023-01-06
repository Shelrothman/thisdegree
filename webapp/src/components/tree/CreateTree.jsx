import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import CREATE_TREE_MUTATION from '../../queries/createTreeMutation';
import DataTree from './DataTree';
import { GiRialtoBridge, GiCastle } from "react-icons/gi";

import { MdOutlineEditRoad } from "react-icons/md";
import HeaderBridge from './HeaderBridge';

// ! user must be authenticated to post a tree




const TEST_TREE = `[
    {
        "id": "8e325b58-6319-bf1e-14ea-3da93232460e",
        "movieTitle": "along came polly",
        "previousActor": {
            "name": "Jennifer Aniston",
            "characterName": "Polly Prince"
        },
        "actorGuessed": true,
        "actorSelection": {
            "id": "053dc009-0447-102f-9d9e-5b0ea911220b",
            "name": "Alec Baldwin",
            "characterName": "Stan Indursky"
        }
    },
    {
        "id": "c4aa0a3b-c847-6692-79b8-2dab8742c86e",
        "movieTitle": "arctic dogs",
        "previousActor": {
            "name": "Alec Baldwin",
            "characterName": "PB (voice)"
        },
        "actorGuessed": true,
        "actorSelection": {
            "id": "f677671a-c87a-b2fb-ce10-ef094d7f0d8e",
            "name": "James Franco",
            "characterName": "Lemmy (voice)"
        }
    },
    {
        "id": "d8e4971e-2b94-5b0f-9a88-531c7e2544ac",
        "movieTitle": "sausage party",
        "previousActor": {
            "name": "James Franco",
            "characterName": "Druggie (voice)"
        },
        "actorGuessed": true,
        "actorSelection": {
            "id": "062d2bf5-95ab-1d41-01dc-7025811da0a8",
            "name": "Kristen Wiig",
            "characterName": "Brenda (voice)"
        }
    },
    {
        "id": "44abd38b-b1ec-cddd-4632-79557e8a5bd3",
        "movieTitle": "A deadly adoption",
        "previousActor": {
            "name": "Kristen Wiig",
            "characterName": "Sarah Benson"
        },
        "actorGuessed": true,
        "actorSelection": {
            "id": "c23c8994-5b2e-67c0-dbd2-4faa98f97bea",
            "name": "Will Ferrell",
            "characterName": "Robert Benson"
        }
    }
]`



const CreateTree = () => {
    const navigate = useNavigate();

    // use the useLocation hook to get the state from the previous page
    //! const { state } = useLocation();
    //! console.log('state: ', state);

    //const [treeObject, setTreeObject] = useState(JSON.parse(state.tree));
    const [treeObject, setTreeObject] = useState(JSON.parse(TEST_TREE));



    console.log('treeObject: ', treeObject)
    console.log(typeof treeObject);

    const [formState, setFormState] = useState({
        // treeDeclaration: state.tree,
        treeDeclaration: 'test tree declaration',
        //! return to uncomment
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
            </form>
            <h2 className="tree-header">
                <span className="tree-header-span">
                    <GiCastle size={30} />
                    &nbsp;
                    {treeObject[0].previousActor.name}
                    &nbsp;
                    <HeaderBridge />
                    &nbsp;
                    {treeObject[treeObject.length - 1].actorSelection.name}
                    &nbsp;
                    <GiCastle size={30} />
                </span>
            </h2>
            <DataTree treeData={treeObject} />
        </div>
    );
};

export default CreateTree;