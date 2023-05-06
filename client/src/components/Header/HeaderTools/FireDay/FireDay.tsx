import React, {FC} from "react";

export const FireDay : FC = () =>{
    return (
        <div className="header-fire_days cursorable ">
            <div className="fire_count">77</div>
            <div className="fire_logo">
                <img className="header-logo" src="/assets/images/FireDayLogo.svg" alt="Logo"/>
            </div>
        </div>
    )
}