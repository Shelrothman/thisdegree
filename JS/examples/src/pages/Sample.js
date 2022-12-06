import {
    useParams,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { getSample, deleteSample } from "../data/data";


export default function Sample() {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    let sample = getSample(parseInt(params.sampleId, 10));
    return (
        <main style={{ padding: "1rem" }}>
            <h2>Total Due: {sample.amount}</h2>
            <p>
                {sample.name}: {sample.number}
            </p>
            <p>Due Date: {sample.due}</p>
            <p>
                <button
                    onClick={() => {
                        deleteSample(sample.number);
                        navigate("/samples" + location.search);
                    }}
                >
                    Delete
                </button>
            </p>
        </main>
    );
}