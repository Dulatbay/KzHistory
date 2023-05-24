import {CssBaseline} from "@mui/material";
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/root.scss'
import App from "@/app/startApp/App";
import {MainProvider} from "@/app/startApp/MainProvider";

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <CssBaseline/>
        <MainProvider>
            <App/>
        </MainProvider>
    </React.StrictMode>
)
