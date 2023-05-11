import {FC, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import IRegData from "../types/IRegData";
import {useAction} from "../hooks/useAction";

export const RegPage: FC = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => state.userState.isAuth)
    const formRef = useRef<HTMLFormElement>(null);
    const userAction = useAction();

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, navigate])

    const regHandleSubmit = async () => {
        if (formRef) {
            let formData = new FormData(formRef.current || undefined);
            let regData: IRegData = {
                email: formData?.get("email")?.toString() || "",
                username: formData?.get("username")?.toString() || "",
                password: formData?.get("password")?.toString() || ""
            }
            await userAction.registration(regData);

        }
    }

    return (
        <div className="primary-border centered-container border-round reg-container">
            <div className="reg-wrapper">
                <div className="reg-content flex-column-center">
                    <div className="reg-header flex-column-center">
                        <div className="reg-app_logo app_logo-container">
                            <img src="/assets/images/AppLogo.svg" alt=""/>
                        </div>
                        <div className="reg-text">Sing up</div>
                    </div>
                    <form className="reg-fields flex-column-center" ref={formRef}>
                        <input className="input_field border-round" type="text" placeholder="Почта..." name='email'/>
                        <input className="input_field border-round" type="text" placeholder="Имя пользователя..."
                               name='username'/>
                        <input className="input_field border-round" type="password" placeholder="Пароль..."
                               name='password'/>
                    </form>
                    <div className="reg-bottom flex-column-center">
                        <button className="cursorable border-round button primary-button"
                                onClick={regHandleSubmit}>Join us
                        </button>
                        <div className="line"></div>
                        <div className="cursorable secondary-text"
                             onClick={() => {
                                 navigate('/login')
                             }}>Have an account?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}