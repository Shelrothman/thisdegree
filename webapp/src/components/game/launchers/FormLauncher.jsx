// import FormContainer from "../form/FormContainer";
// import TreeBuildContainer from "../display/TreeBuildContainer";
// import GameConfirm from "../../modals/GameConfirm";
// import ChallengePrompt from "../../modals/ChallengePrompt";




// function FormLauncher({
//     formTypeMovie,
//     decideMode,
//     confirmModal,
//     actorB,
//     handleCancelClick,
//     challengePrompt,
//     // challengePrompt,
// }) {
//     return (
//         <>
//             <TreeBuildContainer />
//             <div className="sample-scoreboard">
//                 <div>
//                     <div>
//                         <h2 className="blink">Game In Process</h2>
//                         {challengePrompt.show ? <h3>Challenge Mode</h3> : formTypeMovie ? <h3>Movie Mode</h3> : decideMode ? <h3>Decide Mode</h3> : <h3>Actor Mode</h3>}
//                     </div>
                    // {confirmModal.show ? (
                    //     <div className='mx-5'>
                    //         <GameConfirm
                    //             text={confirmModal.text}
                    //             actorB={actorB}
                    //             handleCancelClick={handleCancelClick}
                    //             handleConfirmClick={confirmModal.callback}
                    //         />
                    //     </div>
                    // ) : challengePrompt.show ? (
                    //     // <ChallengePrompt
                    //     //     text={challengePrompt.text}
                    //     //     title={challengePrompt.title}
                    //     //     visible={challengePrompt.show}
                    //     // />
                    //     <></>
                    // ) : (
                    //     <FormContainer />
                    //     // * alert is inside FormContainer
                    // )}
//                 </div>
//             </div>
//         </>

//     );
// }

// export default FormLauncher;