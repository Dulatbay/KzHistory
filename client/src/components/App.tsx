import React from 'react';
import {AppRouter} from "../router/AppRouter";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer theme="light"/>
            <AppRouter/>
        </>
    );
}

export default App;
