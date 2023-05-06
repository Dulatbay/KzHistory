import React, {FC} from "react";
import {BrowserRouter} from "react-router-dom";

export const MainProvider: FC<React.PropsWithChildren> = ({children}) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};