import {useAppDispatch} from "@/shared/model";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {FC, useCallback} from "react";
import {toast} from "react-toastify";
import styles from './registration-form.module.scss'
import {Divider, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Button} from "@/shared/ui/Button/Button";
import {NavLink} from "react-router-dom";
import {
    registrationFormSchema,
    RegistrationFormSchema
} from "@/features/authentication/Registration/model/registrationFormSchema";
import {registrationThunk} from "@/features/authentication/Registration/model/registration";


type Props = {
    onComplete?: () => void
}
export const RegistrationForm: FC = (props: Props) => {

    const dispatch = useAppDispatch()

    const {
        setError,
        formState: {errors},
        handleSubmit,
        register,
    } = useForm<RegistrationFormSchema>({
        resolver: zodResolver(registrationFormSchema),
    })

    const onSubmitHandler = useCallback(
        ({email, password, username}: RegistrationFormSchema) => {
            dispatch(registrationThunk({email, password, username}))
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
                        <Typography className={styles.text}>Регистрация</Typography>
                    </Stack>
                    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
                        <Stack spacing={5}>
                            <Stack spacing={3}
                                   alignItems="strech">
                                <TextField variant="outlined"
                                       size="small"
                                       required
                                       label="Имя пользователя"
                                       {...register('username')}
                                />
                                <TextField  variant="outlined"
                                       size="small"
                                       required
                                       label="Почта"
                                       {...register('email')}
                                />
                                <TextField  variant="outlined"
                                       size="small"
                                       required
                                       label="Пароль"
                                       type="password"
                                       {...register('password')}
                                />
                            </Stack>
                            <Button variant="contained"
                                    type="submit"
                            >Зарегистрироваться</Button>
                        </Stack>
                    </form>
                    <Stack className={styles.bottom} alignItems="center">
                        <Divider flexItem/>
                        <NavLink to={'/login'}>
                            <Button variant="text" color="secondary">
                                Уже есть аккаунт?
                            </Button>
                        </NavLink>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}
