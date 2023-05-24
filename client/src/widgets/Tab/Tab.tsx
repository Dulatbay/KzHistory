import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Toolbar, Container, AppBar, Button} from '@mui/material';
import {UserMenu} from "./UserMenu/UserMenu";
import {MobileNavMenu} from "./MobileNavMenu/MobileNavMenu";
import {DesktopNavMenu} from "./DesktopNavMenu/DesktopNavMenu";
import {useAppSelector} from "@/shared/model";
import {selectIsAuthorized} from "@/entities/session/model/slice";
import {useMeQuery} from "@/entities/session/api/sessionApi";
import {skipToken} from "@reduxjs/toolkit/query";

export interface IPage {
    name: string,
    path: string,
    image: string
}

const pages: IPage[] = [
    {
        name: 'Главная',
        path: '/',
        image: '/profile.svg'
    },
    {
        name: 'Карта тем',
        path: '/modules',
        image: '/profile.svg',
    },
    {
        name: 'Вся хронология ИК',
        path: '/chronology',
        image: '/chronology.svg',
    },
    {
        name: 'Тесты(Quiz)',
        path: '/quizes',
        image: '/profile.svg',
    },
    {
        name: 'Турниры',
        path: '/tournaments',
        image: '/profile.svg'
    },
    {
        name: 'Архив материалов',
        path: '/archive',
        image: '/archive.svg',
    },
    {
        name: 'Сливы ент',
        path: '/ent-leaks',
        image: '/ent-leaks.svg',
    },
]
const settings: IPage[] = [
    {
        name: "Профиль",
        path: "/profile",
        image: '/profile.svg'
    },
    {
        name: "Статистика",
        path: "/statistics",
        image: '/statistics.svg'
    },
    {
        name: "Настройки",
        path: "/settings",
        image: '/profile.svg'
    },
    {
        name: "Выйти",
        path: "/exit",
        image: '/exit.svg'
    },

];

const logoText = "ИК"

export const Tab = () => {
    // const [logout, {isSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const isAuthorized = useAppSelector(selectIsAuthorized)

    const {data: profileData} = useMeQuery(
        isAuthorized ? undefined : skipToken,
        {
            skip: !isAuthorized,
        }
    )
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path: string | null) => {
        setAnchorElNav(null);
        if (path)
            navigate(path)
    };

    const handleCloseUserMenu = (path: string | null) => {
        setAnchorElUser(null);
        if (path === '/exit') {
            //
            navigate('/LoginPage')
        } else if (path)
            navigate(path)

    };


    return (
        <AppBar position="static"
                color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DesktopNavMenu pages={pages}
                                    handleCloseNavMenu={handleCloseNavMenu}
                                    logoText={logoText}/>
                    <MobileNavMenu anchorElNav={anchorElNav}
                                   handleOpenNavMenu={handleOpenNavMenu}
                                   logoText={logoText}
                                   handleCloseNavMenu={handleCloseNavMenu}
                                   pages={pages}/>
                    {
                        isAuthorized && profileData ?
                            <UserMenu
                                user={profileData}
                                handleOpenUserMenu={handleOpenUserMenu}
                                anchorElUser={anchorElUser}
                                settings={settings}
                                handleCloseUserMenu={handleCloseUserMenu}/>
                            :
                            <Button variant="outlined"
                                    sx={{my: 2, color: 'white', display: 'block', borderColor: 'white'}}
                                    onClick={() => navigate('/LoginPage')}
                            >Login</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )

}
