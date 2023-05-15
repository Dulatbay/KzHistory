import styles from './tab.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useLogoutUserMutation} from "../../redux/api/authApi";
import {useEffect} from "react";


interface IPage {
    name: string,
    path: string
}

const pages: IPage[] = [
    {
        name: 'Профиль',
        path: '/profile'
    },
    {
        name: 'Главная',
        path: '/'
    },
    {
        name: 'Карта тем',
        path: '/modules'
    },
    {
        name: 'Тесты(Quiz)',
        path: '/quizes'
    },
    {
        name: 'Турниры',
        path: '/tournaments'
    },
    {
        name: 'Архив материалов',
        path: '/archive'
    },
]

export const Tab = () => {
    const [logout, {isSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();


    useEffect(()=>{
        if(isSuccess) navigate('/')
    },[isSuccess, navigate])

    return (
        <div className={styles.container}>
            <div className="header">
                <NavLink to='/'>
                    <h3>Kz History</h3>
                </NavLink>
            </div>
            <div className="main">
                <ul>
                    {
                        pages.map(page =>
                            <li><NavLink to={page.path}>{page.name}</NavLink></li>
                        )
                    }
                </ul>
            </div>
            <div className="bottom">
                <Button onClick={() => {
                    logout()

                }}>
                    Logout
                </Button>
            </div>
        </div>
    )
}