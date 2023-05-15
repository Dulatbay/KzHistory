import React, {FC, FormEvent, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from './login-page.module.scss'
import {Button, Divider, Stack, TextField} from "@mui/material";
import {useLoginUserMutation} from "../../redux/api/authApi";
import {toast} from "react-toastify";
import ILoginData from "../../types/ILoginData";
import {useAppSelector} from "../../redux/hooks";

export const LoginPage: FC = () => {
    const [loginUser, {isLoading, error, isError, isSuccess}] = useLoginUserMutation();
    const {user} = useAppSelector(state => state.userState)
    const navigate = useNavigate()

    useEffect(() => {
            if (isSuccess || user) navigate('/');
            else if (isError) {
                if ((error as any).data)
                    toast.error((error as any)?.data?.message)
                else
                    toast.error((error as any)?.message)
            }
        }, [isLoading, navigate, isError, isSuccess, error, user]
    )

    const loginHandleSubmit = (form: FormEvent<HTMLFormElement>) => {
        form.preventDefault()

        const formData = new FormData(form.currentTarget);
        const regUser: ILoginData = {
            email: formData.get("email")?.toString() || "",
            password: formData.get("password")?.toString() || "",
        }
        loginUser(regUser);
    }


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Stack className={styles.content}
                       spacing={5}
                       justifyContent="space-around"
                       alignItems="strech"
                >
                    <Stack className={styles.header}
                           alignItems="center">
                        <div>
                            <img src="/assets/images/AppLogo.svg" alt=""/>
                        </div>
                        <div className={styles.text}>Вход</div>
                    </Stack>
                    <form className="form" onSubmit={loginHandleSubmit}>
                        <Stack spacing={5}>
                            <Stack spacing={3}
                                   alignItems="strech">
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           name="email"
                                           label="Почта"
                                           type="email"
                                />
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           name="password"
                                           label="Пароль"
                                           type="password"
                                />
                            </Stack>
                            <Button variant="contained"
                                    type="submit"
                            >Войти</Button>
                        </Stack>
                    </form>
                    <Stack className={styles.bottom} alignItems="center">
                        <Divider/>
                        <NavLink to={'/registration'}>
                            <Button variant="text">
                                Нет аккаунта?
                            </Button>
                        </NavLink>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}