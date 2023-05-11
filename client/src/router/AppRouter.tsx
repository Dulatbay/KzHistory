import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {RouteNames, routes} from "./index";
import {HomePage} from "../pages";
import {MainTopic} from "../components/MainTopic/MainTopic";
import {Profile} from "../components/Profile/Profile";
import {ModuleList} from "../components/ModuleList/ModuleList";
import {Topic} from "../components/Topic/Topic";

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<HomePage />}>
                <Route path={'/'} index element={<MainTopic />} />
                <Route path={'/profile'} element={<Profile />} />
                <Route path={'/module-list'} element={<ModuleList />} />
                <Route path={'/topic'} element={<Topic />} />
            </Route>
            {
                routes.map(route =>
                    <Route key={route.path}
                           path={route.path}
                           Component={route.component}
                           index
                    />
                )
            }

        </Routes>
    )
}