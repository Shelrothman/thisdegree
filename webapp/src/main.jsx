import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

//the httpLink that will connect our ApolloClient instance with the GraphQL API which is running on loc
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

// initialize ApolloClient
const client = new ApolloClient({
    link: httpLink,
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
