import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../store/hooks";

export const HeaderProfile: FC = () => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.userState.user)

    return (
        <div className="cursorable header-profile">
            <div className="league_logo" onClick={()=>{navigate('/')}}>
                <img className="header-logo" src="/assets/images/KhanLogo.svg" alt="Logo"/>
            </div>
            <div className="text" onClick={()=>{navigate('/profile')}}>
                <div className="username">{user?.username}</div>
                <div className="league_name">{user?.leagueName}</div>
            </div>
        </div>
    )
}