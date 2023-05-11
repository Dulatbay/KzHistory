import {FC} from "react";

export const Header: FC = () => {
    return <div className="profile-header flex-row-between">
        <div className="profile-text secondary-text">Profile</div>
        <div className="profile-settings flex-row-between cursorable">
            <img src="/assets/images/Settings.svg" alt=""/>
        </div>
    </div>
}