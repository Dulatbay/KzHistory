import React, {FC} from "react";
import {ArrowButton} from "../../generetic/ArrowButton/ArrowButton";

export const HeaderModule: FC = () => {
    const previousButtonHandler = () =>{

    }

    const nextButtonHandler = () =>{

    }

    return (
        <div className="header-module">
            <ArrowButton buttonCallback={previousButtonHandler}
                         imageUrl={'/assets/images/LeftArrow.svg'}
                         classNames={'previous_button cursorable'} />
            <div className="current_module cursorable ">Казахское ханство (1465-1730)</div>
            <ArrowButton buttonCallback={nextButtonHandler}
                         imageUrl={'/assets/images/RightArrow.svg'}
                         classNames={'next_button cursorable'} />
        </div>)
}