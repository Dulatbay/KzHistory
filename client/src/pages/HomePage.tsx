import React, {FC} from "react";
import {Header} from "../components/Header/Header";
import {MainTopic} from "../components/MainTopic/MainTopic";

export const HomePage : FC = () =>{
    return (
        <div className="home-page">
            <Header/>
            <MainTopic/>
        </div>
    )
}