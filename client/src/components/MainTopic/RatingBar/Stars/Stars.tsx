import React, {FC} from "react";
import {Star} from "./Star";

export const Stars: FC = () => {
    return (
        <div className="stars cursorable">
            {
                ([1, 2, 3]).map(value => <Star key={value}/>)
            }
        </div>
    )
}