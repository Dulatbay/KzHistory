import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {Button, Input, Stack} from "@mui/material";
import {registerUser} from "../../features/auth/authAction";

export const RegPage: FC = () => {
    const {loading, userInfo, error, success} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch()

    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();


    useEffect(() => {
        if (success) navigate('/profile')
    }, [navigate, userInfo, success])

    const regHandleSubmit = (data: any) => {
        const user = {
            username: data.username,
            email: data.email,
            password: data.password
        };

        dispatch(registerUser(user))
    }

    return (
        <div className="centered-container">
            <div className="reg-container">
                <div className="header">
                    <div className="logo"></div>
                    <div className="text">Kz History</div>
                </div>
                <div className="main">
                    <form onSubmit={handleSubmit(regHandleSubmit)}>
                        <Stack>
                            <Input placeholder="Имя пользователя"
                                   {...register('username')}
                                   name="username"/>
                            <Input placeholder="Почта"
                                   {...register('email')}
                                   required
                            />
                            <Input placeholder="Пароль"
                                   type="password"
                                   {...register('password')}
                                   required/>
                            <Button content="Зарегестрироваться"/>
                        </Stack>
                    </form>
                </div>
                <div className="bottom"></div>
            </div>

        </div>
    )
}