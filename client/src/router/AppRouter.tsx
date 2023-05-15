import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/HomePage/HomePage";
import {useRefreshTokenQuery} from "../redux/api/authApi";
import {LoginPage, NotFoundPage, RegPage} from "../pages";
import {MainPage} from "../pages/HomePage/MainPage/MainPage";
import {ProfilePage} from "../pages/HomePage/ProfilePage/ProfilePage";
import {ModulesPage} from "../pages/HomePage/ModulesPage/ModulesPage";
import {QuizesPage} from "../pages/HomePage/QuizesPage/QuizesPage";
import {TournamentsPage} from "../pages/HomePage/TournamentsPage/TournamentsPage";
import {ArchivePage} from "../pages/HomePage/ArchivePage/ArchivePage";
import {EntLeaksPage} from "../pages/HomePage/EntLeaksPage/EntLeaksPage";

export const AppRouter: FC = () => {
    const token = localStorage.getItem('token')
    const {isLoading, isFetching} = useRefreshTokenQuery(null, {
        skip: !token,
    });

    const loading = isLoading || isFetching;

    if (loading) return <>Loading</>

    return (
        <Routes>
            <Route path='/' Component={HomePage}>
                <Route index Component={MainPage}/>
                <Route path='/profile' Component={ProfilePage}/>
                <Route path='/modules' Component={ModulesPage}>
                    <Route path='/modules/:id' Component={() => <>Modules Detail</>}/>
                </Route>
                <Route path='/quizes' Component={QuizesPage}>
                    <Route path='/quizes/:id' Component={() => <>Quiz Detail</>}/>
                </Route>
                <Route path='/tournaments' Component={TournamentsPage}>
                    <Route path='/tournaments/:id' Component={() => <>Tournament Detail</>}/>
                </Route>
                <Route path='/archive' Component={ArchivePage}/>
                <Route path='/ent-leaks' Component={EntLeaksPage}/>
            </Route>
            <Route path='/login' Component={LoginPage}/>
            <Route path='/registration' Component={RegPage}/>
            <Route path='*' Component={NotFoundPage}/>
        </Routes>
    )
}