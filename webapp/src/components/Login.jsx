import { useEffect, useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/constants';
import { useLogin } from '../hooks/useGQLclient';

import Spinner from '../utils/Spinner';

// * the returned token is what we can attach to subsequent requests to authenticate the user(i.e. indicate that a request is made on behalf of that user).

function Login() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [formState, setFormState] = useState({
        // login: true,
        email: state?.email || '',
        password: state?.password || '',
        name: state?.name || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const [login] = useMutation(LOGIN_MUTATION, {
    //     variables: {
    //         email: formState.email,
    //         password: formState.password
    //     },
    //     onCompleted: ({ login }) => {
    //         localStorage.setItem(AUTH_TOKEN, login.token);
    //         navigate('/');
    //     }
    // });

    const {
        mutate: login,
        isLoading,
        error: loginError,
        data
    } = useLogin(formState.email, formState.password);



    useEffect(() => {
        if (isLoading) setLoading(true);
        if (loginError) setError(loginError);
        if (data) {
            localStorage.setItem(AUTH_TOKEN, data?.login.token);
            navigate('/');
        }
    }, [isLoading, loginError, data]);




    return (
        <div>
            {loading && <Spinner />}
            {error && <div>Error hath occured! Uh oh...{error}</div>}
            {!loading && !error && (
                <>
                    <h2>Welcome {formState.name}</h2>
                    <h4 className="mv3">Login</h4>
                    <div className="flex flex-column">
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
                            placeholder="Your password"
                        />
                    </div>

                    <div className="flex mt3">
                        <button className="pointer mr2 button" onClick={login}>
                            Login
                        </button>
                        <button
                            className="pointer button"
                            onClick={() => navigate('/signup')}
                        >
                            Create New Account
                        </button>
                    </div>
                </>
            )}

        </div>
    );
};

export default Login;