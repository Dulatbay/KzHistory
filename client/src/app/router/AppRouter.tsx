import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "@/pages/HomePage/MainPage/MainPage";
import {ProfilePage} from "@/pages/HomePage/ProfilePage/ProfilePage";
import {ModulesPage} from "@/pages/HomePage/ModulesPage/ModulesPage";
import {QuizesPage} from "@/pages/HomePage/QuizesPage/QuizesPage";
import {TournamentsPage} from "@/pages/HomePage/TournamentsPage/TournamentsPage";
import {ArchivePage} from "@/pages/HomePage/ArchivePage/ArchivePage";
import {EntLeaksPage} from "@/pages/HomePage/EntLeaksPage/EntLeaksPage";
import {LoginPage} from "@/pages/LoginPage/ui/LoginPage/LoginPage";
import {RegistrationPage} from "@/pages/RegistrationPage/RegistrationPage/RegistrationPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {BaseLayout} from "@/app/layouts/baseLayout";

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path='/' Component={BaseLayout}>
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
            <Route path='/registration' Component={RegistrationPage}/>
            <Route path='*' Component={NotFoundPage}/>
        </Routes>
    )
}