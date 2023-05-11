import {FC, useEffect, useRef, useState} from "react";
import {State, StateProps} from "./State/State";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useAction} from "../../hooks/useAction";
import {useNavigate} from "react-router-dom";
import {Header} from "./Header/Header";
import {fileService} from "../../services/fileService";
import {AxiosResponse} from "axios";
import IUser from "../../types/IUser";

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

export const Profile: FC = () => {
    const user = useAppSelector(state => state.userState.user)
    const userAction = useAction();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState("");
    const appDispatch = useAppDispatch()

    useEffect(() => {
        setImage(user?.imageUri || "");
    }, [user])

    const handleClick = () => {
        inputRef?.current?.click();
    };

    const handleChange = (event: any) => {
        const file = event.target.files[0];

        if (!file || !user?.id) return;


        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', JSON.stringify(user?.id));

        fileService.uploadUserImage(formData).then((r: AxiosResponse<IUser>) => {
            userAction.saveUser(r.data, appDispatch);
        }).catch(e=>console.log(e));
    };
    const exitHandle = () => {
        userAction.logout();
        navigate('/login')
    }

    return <div className="content-container profile-container">
        <Header/>
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
                <div className={"profile-image-edit cursorable"} onClick={handleClick}>
                    <img src="/assets/images/Edit.svg" alt=""/>
                    <input
                        type="file"
                        ref={inputRef}
                        style={{display: "none"}}
                        onChange={handleChange}

                    />
                </div>
                <img
                    src={fileService.getFileName(image)}
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
        <button className="button border-round error-outlined-button cursorable" onClick={exitHandle}>Exit</button>
    </div>
}
