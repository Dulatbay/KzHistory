import React, {FC} from "react";
import {LevelNumber} from "./LevelNumber/LevelNumber";
import {Stars} from "./Stars/Stars";

export const RatingBar: FC = () => {
    return (
        <div className="rating_bar">
            <LevelNumber/>
            <Stars/>
        </div>
    )
}