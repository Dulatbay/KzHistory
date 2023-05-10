import React, {FC, useEffect} from 'react';
import {HeaderProfile} from "./HeaderProfile/HeaderProfile";
import {HeaderModule} from "./HeaderModule/HeaderModule";
import {HeaderTools} from "./HeaderTools/HeaderTools";
import {useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";

export const Header: FC = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => state.userState.isAuth)

    useEffect(() => {
        if (!isAuth) navigate('/login')
    }, [])

    return (
        <header>
            <div className="header-wrapper">
                <div className="header-container">
                    <HeaderProfile/>
                    <HeaderModule/>
                    <HeaderTools/>
                </div>
            </div>
        </header>
    );
}

