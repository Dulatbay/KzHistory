import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {MainProvider} from "./components/MainProvider";
import './styles/root.scss'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <MainProvider>
            <App />
        </MainProvider>
    </React.StrictMode>
);
