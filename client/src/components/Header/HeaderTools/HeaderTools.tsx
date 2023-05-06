import React, {FC} from "react";
import {FireDay} from "./FireDay/FireDay";
import {Quiz} from "./Quiz/Quiz";

export const HeaderTools: FC = () => {
    return (
        <div className="header-tools">
            <FireDay />
            <Quiz />
        </div>
    )
}