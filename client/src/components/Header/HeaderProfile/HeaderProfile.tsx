import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

export const HeaderProfile: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="cursorable header-profile">
            <div className="league_logo" onClick={()=>{navigate('/')}}>
                <img className="header-logo" src="/assets/images/KhanLogo.svg" alt="Logo"/>
            </div>
            <div className="text" onClick={()=>{navigate('/profile')}}>
                <div className="username">Dulatbay</div>
                <div className="league_name">Khan</div>
            </div>
        </div>
    )
}