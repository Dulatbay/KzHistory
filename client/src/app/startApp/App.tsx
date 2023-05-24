import React from "react";
import {AppRouter} from "@/app/router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
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
