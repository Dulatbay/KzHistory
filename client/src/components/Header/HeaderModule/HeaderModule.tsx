import React, {FC, useEffect, useState} from "react";
import {ArrowButton} from "../../generetic/ArrowButton/ArrowButton";
import {useAppSelector} from "../../../store/hooks";
import {useNavigate} from "react-router-dom";

export const HeaderModule: FC = () => {
    const moduleState = useAppSelector(state => state.moduleState.currentModule?.title)
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(moduleState || "")
    }, [moduleState])

    const previousButtonHandler = () => {
    }
    const nextButtonHandler = () => {
    }


    return (
        <div className="header-module flex-row-between">
            {
                title == "" ? "" :
                    <ArrowButton buttonCallback={previousButtonHandler}
                                 imageUrl={'/assets/images/LeftArrow.svg'}
                                 classNames={'previous_button cursorable'}/>
            }
            <div className="current_module cursorable" onClick={() => {
                navigate('/module-list')
            }}>
                {title == "" ? "История казахстана" : title}
            </div>
            {
                title == "" ? "" :
                    <ArrowButton buttonCallback={nextButtonHandler}
                                 imageUrl={'/assets/images/RightArrow.svg'}
                                 classNames={'next_button cursorable'}/>
            }
        </div>)
}