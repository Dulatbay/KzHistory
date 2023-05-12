import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from './login-page.module.scss'

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginHandleSubmit = () => {

    }

    return (
        <div className={styles.loginContainer}>
            <div className="login-wrapper">
                <div className="login-content">
                    <div className="login-header flex-column-center">
                        <div className="login-app_logo app_logo-container">
                            <img src="/assets/images/AppLogo.svg" alt=""/>
                        </div>
                        <div className="login-text">Sing in</div>
                    </div>
                    <form className="login-fields">
                        <input className="input_field border-round" type="text"
                               placeholder="Почта или имя пользователя..." value={usernameOrEmail}
                               onChange={(e) => {
                                   setUsernameOrEmail(e.currentTarget.value);
                               }}
                        />
                        <input className="input_field" type="password"
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