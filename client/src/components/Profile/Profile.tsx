import {State, StateProps} from "./State/State";
import {Header} from "./Header/Header";

const arrayState: StateProps[] = [
    {
        image: 'assets/images/FireDayLogo.svg', title: '0', secondary: 'Огненный режим'
    },
    {
        image: 'assets/images/PointsLogo.svg', title: '0', secondary: 'Очки'
    },
    {
        image: 'assets/images/KHANLeagueLogo.svg', title: 'Boy', secondary: 'Текущая лига'
    },
    {
        image: 'assets/images/QuizesPassedLogo.svg', title: '0', secondary: 'Тестов пройдено'
    },
    {
        image: 'assets/images/AccuracyLogo.svg', title: '0', secondary: 'Точность'
    },
    {
        image: 'assets/images/TopicsCoveredLogo.svg', title: '0', secondary: 'Пройденных тем'
    },

];

export const Profile = () => {
    const user: any = {};
    const editClickHandle = () => {

    };


    const exitClickHandle = () => {

    };


    return <div className="profile-container">
        <Header/>
        <div className="profile-main">
            <div className="profile-main-left">
                <div className="profile-fields">
                    <div className="profile-username">{user.username}</div>
                    <div className="profile-email">{user.email}</div>
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
                <div className={"profile-image-edit cursorable"} onClick={editClickHandle}>
                    <img src="/assets/images/Edit.svg" alt=""/>
                    <input
                        type="file"
                        ref={null}
                        style={{display: "none"}}
                        onChange={() => {
                        }}
                    />
                </div>
                <img
                    src={user.imageUri}
                    alt=""
                    className="profile-image"
                />

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
                                       key={stateProps.title}
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
                                       key={stateProps.title}
                                />
                            )
                    }
                </div>
            </div>
        </div>
        <div className="line profile-bottom-line"></div>
        <button className="button border-round error-outlined-button cursorable" onClick={exitClickHandle}>Exit</button>
    </div>
}
