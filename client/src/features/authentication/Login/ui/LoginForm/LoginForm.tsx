import {zodResolver} from '@hookform/resolvers/zod'
import {FC, useCallback} from 'react'
import {useForm} from 'react-hook-form'
import styles from './login-form.module.scss'
import {useAppDispatch} from "@/shared/model";
import {loginThunk} from "@/features/authentication/Login/model/login";
import {Divider, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Button} from "@/shared/ui/Button/Button";
import {NavLink} from "react-router-dom";
import {loginFormSchema, type LoginFormSchema} from "@/features/authentication/Login/model/loginFormSchema";
import {toast} from 'react-toastify'

type Props = {
    onComplete?: () => void
}

export const LoginForm: FC = (props: Props) => {
    const dispatch = useAppDispatch()

    const {
        setError,
        formState: {errors},
        handleSubmit,
        register,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    })

    const onSubmitHandler = useCallback(
        ({email, password}: LoginFormSchema) => {
            dispatch(loginThunk({email, password}))
                .unwrap()
                .then(() => props.onComplete?.())
                .catch((error: any) => {
                    setError('email', {type: 'server', message: error.message})
                    toast.error(error.message)
                })
        }, []
    )

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
                        <Typography className={styles.text}>Вход</Typography>
                    </Stack>
                    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
                        <Stack spacing={5}>
                            <Stack spacing={3}
                                   alignItems="strech">
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           label="Почта"
                                           type="email"
                                           value="user@mail.com"
                                           {...register('email')}
                                />
                                <TextField variant="outlined"
                                           size="small"
                                           required
                                           label="Пароль"
                                           type="password"
                                           value="password"
                                           {...register('password')}
                                />
                            </Stack>
                            <Button variant="contained"
                                    type="submit"
                            >Войти</Button>
                        </Stack>
                    </form>
                    <Stack className={styles.bottom} alignItems="center">
                        <Divider flexItem/>
                        <NavLink to={'/registration'}>
                            <Button variant="text" color="secondary">
                                Нет аккаунта?
                            </Button>
                        </NavLink>
                    </Stack>
                </Stack>
            </div>
        </div>
    )

}