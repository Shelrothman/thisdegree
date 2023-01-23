import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// yea we cant inspect mutations: https://github.com/tannerlinsley/react-query-devtools/issues/31#issuecomment-655794286


//TODO: allow user to input their own actor name
// * will need to validate the actor exists through the API and if itdoes, store the string like the others... if not then say no choose again

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </BrowserRouter>
);
