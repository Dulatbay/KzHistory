import React, {FC} from "react";

export const HeaderProfile: FC = () => {
    return (
        <div className="cursorable header-profile">
            <div className="league_logo">
                <img className="header-logo" src="/assets/images/KhanLogo.svg" alt="Logo"/>
            </div>
            <div className="text">
                <div className="username">Dulatbay</div>
                <div className="league_name">Khan</div>
            </div>
        </div>
    )
}