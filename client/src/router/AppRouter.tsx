import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "./index";

export const AppRouter: FC = () => {
    return (
        <Routes>
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