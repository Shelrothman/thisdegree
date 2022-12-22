import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

import App from './App';
import { AUTH_TOKEN } from './utils/constants';

//the httpLink that will connect our ApolloClient instance with the GraphQL API which is running on loc
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

//* Apollo Links allow us to create middlewares that modify requests before they are sent to the server.
const authLink = setContext((_, { headers }) => {
    // first, we get the authentication token from localStorage if it exists; after that, we return the headers to the context so httpLink can read them.
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});


// initialize ApolloClient
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ApolloProvider>
    </BrowserRouter>
);
