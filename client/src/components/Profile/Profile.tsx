import {FC} from "react";
import {State, StateProps} from "./State/State";
import {useAppSelector} from "../../store/hooks";
import {useAction} from "../../hooks/useAction";
import {useNavigate} from "react-router-dom";

const arrayState: StateProps[] = [
    {
        image: 'assets/images/FireDayLogo.svg', title: '771', secondary: 'Огненный режим'
    },
    {
        image: 'assets/images/FireDayLogo.svg', title: '772', secondary: 'Огненный режим'
    },
    {
        image: 'assets/images/FireDayLogo.svg', title: '773', secondary: 'Огненный режим'
    },
    {
        image: 'assets/images/FireDayLogo.svg', title: '774', secondary: 'Огненный режим'
    },
    {
        image: 'assets/images/FireDayLogo.svg', title: '775', secondary: 'Огненный режим'
    },
    {
        image: 'assets/images/FireDayLogo.svg', title: '776', secondary: 'Огненный режим'
    },

];

export const Profile: FC = () => {
    const user = useAppSelector(state => state.userState.user)
    const userAction = useAction();
    const navigate = useNavigate();
    const exitHandle = () =>{
        userAction.logout();
        navigate('/login')
    }

    return <div className="content-container profile-container">
        <div className="profile-header flex-row-between">
            <div className="profile-text secondary-text">Profile</div>
            <div className="profile-settings flex-row-between cursorable">
                <img src="/assets/images/Settings.svg" alt=""/>
            </div>
        </div>
        <div className="profile-main flex-row-between">
            <div className="profile-main-left">
                <div className="profile-fields">
                    <div className="profile-username">{user?.username}</div>
                    <div className="profile-email">{user?.email}</div>
                    <div className="profile-reg_date">Registration: not found</div>
                </div>
                <div className="profile-friends-container flex-row-between">
                    <div className="profile-followers cursorable">0 followers</div>
                    <div className="profile-following cursorable">0 following</div>
                </div>
                <button className="button primary-outlined-button border-round cursorable">
                    <span className="content">
                        <img src="/assets/images/FindFriends.svg" alt=""/>
                        <span className="span">Find friends</span>
                    </span>
                </button>
            </div>
            <div className="profile-main-right">
                <img src="/assets/images/Edit.svg" alt="" className="profile-image-edit cursorable"/>
                <img src="/assets/images/Kerei_Zhanibek.png" alt="" className="profile-image"/>
            </div>
        </div>
        <div className="line profile-bottom-line"></div>
        <div className="profile-statistics">
            <div className="profile-statistics-text">Statistics</div>
            <div className="profile-statistics-container">
                <div className="left">
                    {
                        arrayState.slice(0, arrayState.length / 2)
                            .map(stateProps =>
                                <State title={stateProps.title}
                                       secondary={stateProps.secondary}
                                       image={stateProps.image}
                                />
                            )
                    }
                </div>
                <div className="right">
                    {
                        arrayState.slice(arrayState.length / 2, arrayState.length)
                            .map(stateProps =>
                                <State title={stateProps.title}
                                       secondary={stateProps.secondary}
                                       image={stateProps.image}
                                />
                            )
                    }
                </div>
            </div>
        </div>
        <div className="line profile-bottom-line"></div>
        <button className="button border-round error-outlined-button cursorable" onClick={exitHandle}>Exit</button>
    </div>
}
