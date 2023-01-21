import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/constants';
import { useSignup } from '../hooks/useGQLclient';
import Spinner from '../utils/Spinner';

function Signup() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        // login: true,
        email: '',
        password: '',
        name: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const {
        mutate: signup,
        isLoading,
        error: signupError,
        data
    } = useSignup(formState.email, formState.password, formState.name);

    useEffect(() => {
        if (isLoading) setLoading(true);
        if (signupError) setError(signupError);
        if (data) {
            localStorage.setItem(AUTH_TOKEN, data?.signup.token);
            navigate('/login', { state: { email: formState.email, password: formState.password, name: formState.name } });
        }
    }, [isLoading, signupError, data]);




    return (
        <div>
            {loading && <Spinner />}
            {error && <div>Error hath occured! Uh oh...{error}</div>}
            {!loading && !error && (
                <>
                    <h4 className="mv3">
                        Sign Up
                    </h4>
                    <div className="flex flex-column">
                        <input
                            value={formState.name}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    name: e.target.value
                                })
                            }
                            type="text"
                            placeholder="Your name"
                        />
                        <input
                            value={formState.email}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    email: e.target.value
                                })
                            }
                            type="text"
                            placeholder="Your email address"
                        />
                        <input
                            value={formState.password}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    password: e.target.value
                                })
                            }
                            type="password"
                            placeholder="Choose a safe password"
                        />
                    </div>

                    <div className="flex mt3">
                        <button
                            className="pointer mr2 button"
                            onClick={signup}
                        >
                            Create Account
                        </button>
                        <button
                            className="pointer button"
                            onClick={() => navigate('/login')}
                        >
                            Already have an account?
                        </button>
                    </div>
                </>
            )}

        </div>
    );
};

export default Signup;