import React, {FC, useEffect} from 'react';
import {HeaderProfile} from "./HeaderProfile/HeaderProfile";
import {HeaderModule} from "./HeaderModule/HeaderModule";
import {HeaderTools} from "./HeaderTools/HeaderTools";
import {useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";
import {useAction} from "../../hooks/useAction";
import {userActions} from "../../store/reducers/user/userActions";
import {userService} from "../../services/userService";

export const Header: FC = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => state.userState.isAuth)
    const currentModule = useAppSelector(state => state.moduleState.currentModule)
    const userAction = useAction();

    useEffect(() => {
        if (!isAuth) navigate('/login')
        if (!localStorage.getItem('currentModuleId')) navigate('/module-list')
        if (!currentModule)
            userAction.initModule();
    }, [])
    useEffect(() => {
        if (!isAuth) navigate('/login')
    }, [isAuth])

        useEffect(() => {
        if (currentModule) navigate('/module-list')
        else navigate('/module-list')
    }, [currentModule])

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

