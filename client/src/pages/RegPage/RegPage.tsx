import React, {FC, FormEvent, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Divider, Stack, TextField} from "@mui/material";
import styles from "../RegPage/reg-page.module.scss";
import {useRegisterUserMutation} from "../../redux/api/authApi";
import {toast} from "react-toastify";

export const RegPage: FC = () => {
    const [registerUser, {isSuccess, isError, error, isLoading}] = useRegisterUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) navigate('/')
        else if (isError) {
            if ((error as any).data)
                toast.error((error as any)?.data?.message)
            else
                toast.error((error as any)?.message)
        }
    }, [isSuccess, isError, error, isLoading, navigate])

    const regSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        registerUser({
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        })
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
                        <div className={styles.text}>Регистрация</div>
                    </Stack>
                    <form className="form" onSubmit={regSubmit}>
                        <Stack spacing={5}>
                            <Stack spacing={3}
                                   alignItems="strech">
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           label="Имя пользователя"
                                           name="username"
                                />
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           label="Почта"
                                           name="email"
                                />
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           label="Пароль"
                                           name="password"
                                           type="password"
                                />
                            </Stack>
                            <Button variant="contained"
                                    type="submit"
                            >Зарегистрироваться</Button>
                        </Stack>
                    </form>
                    <Stack className={styles.bottom} alignItems="center">
                        <Divider/>
                        <NavLink to={'/login'}>
                            <Button variant="text">
                                Уже есть аккаунт?
                            </Button>
                        </NavLink>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}
