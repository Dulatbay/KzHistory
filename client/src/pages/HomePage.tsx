import React, {FC} from "react";
import {Header} from "../components/Header/Header";
import {Outlet} from "react-router-dom";

export const HomePage : FC = () => {
    return (
        <div className="home-page">
            <Header/>
            <Outlet />
        </div>
    )
}