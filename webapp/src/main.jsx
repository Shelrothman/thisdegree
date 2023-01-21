import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// yea we cant inspect mutations: https://github.com/tannerlinsley/react-query-devtools/issues/31#issuecomment-655794286
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';


const queryClient = new QueryClient();


//!! initialize ApolloClient
// !! remove this cruft once done with rq
const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ApolloProvider>
    </BrowserRouter>
);
