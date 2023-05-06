import React, {FC} from 'react';
import {HeaderProfile} from "./HeaderProfile/HeaderProfile";
import {HeaderModule} from "./HeaderModule/HeaderModule";
import {HeaderTools} from "./HeaderTools/HeaderTools";

export const Header: FC = () => {
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

