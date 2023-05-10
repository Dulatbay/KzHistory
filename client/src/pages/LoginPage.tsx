import {FC, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import $api from "../services/axiosService";
import {useAction} from "../hooks/useAction";

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => state.userState.isAuth)
    const userAction = useAction();
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth])


    const loginHandleSubmit = () => {
        userAction.login({
            usernameOrEmail: usernameOrEmail,
            password: password
        })
    }

    return (
        <div className="primary-border centered-container border-round login-container">
            <div className="login-wrapper">
                <div className="login-content flex-column-center">
                    <div className="login-header flex-column-center">
                        <div className="login-app_logo app_logo-container">
                            <img src="/assets/images/AppLogo.svg" alt=""/>
                        </div>
                        <div className="login-text">Sing in</div>
                    </div>
                    <form className="login-fields flex-column-center">
                        <input className="input_field border-round" type="text"
                               placeholder="Почта или имя пользователя..." value={usernameOrEmail}
                                onChange={(e)=>{
                                    setUsernameOrEmail(e.currentTarget.value);
                                }}
                        />
                        <input className="input_field border-round" type="password"
                               placeholder="Пароль..." name='password' value={password}
                               onChange={(e) => {
                                   setPassword(e.currentTarget.value)
                               }}/>
                    </form>
                    <div className="login-bottom flex-column-center">
                        <button className="cursorable border-round button primary-button"
                                onClick={loginHandleSubmit}
                        >Login
                        </button>
                        <div className="line"></div>
                        <div className="cursorable secondary-text"
                             onClick={() => {
                                 navigate('/registration')
                             }}>No account?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}