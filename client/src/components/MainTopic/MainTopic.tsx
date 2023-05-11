import React, {FC, useEffect, useState} from "react";
import {ArrowButton} from "../generetic/ArrowButton/ArrowButton";
import {RatingBar} from "./RatingBar/RatingBar";
import {Content} from "./Content/Content";
import {fileService} from "../../services/fileService";
import {useAppSelector} from "../../store/hooks";
import ITopic from "../../types/ITopic";
import {useAction} from "../../hooks/useAction";
import {useNavigate} from "react-router-dom";

export const MainTopic: FC = () => {
    const userAction = useAction();
    const navigate = useNavigate()
    const [currentTopic, setCurrentTopic] = useState<ITopic>();
    const currentModule = useAppSelector(state => state.moduleState.currentModule)
    const currentTopicNumber = useAppSelector(state => state.moduleState.currentTopicNumber)

    useEffect(() => {
        if (currentTopicNumber == null) userAction.changeTopic(1);
        const topic = currentModule?.topics.find((t) => t.number === currentTopicNumber)
        setCurrentTopic(topic);
    }, [currentTopicNumber, currentModule])
    console.log(currentModule?.topics)
    console.log(currentTopicNumber)
    const previousButtonHandler = () => {
        if (currentModule && currentTopicNumber === 1) return;
        userAction.changeTopic(currentTopicNumber ? currentTopicNumber - 1 : -1);
    }
    const chooseClickHandle = () => {
        navigate('/topic')
    }
    const nextButtonHandler = () => {
        if (currentModule && currentTopicNumber === currentModule?.topics?.length) return;
        userAction.changeTopic(currentTopicNumber ? currentTopicNumber + 1 : -1);
    }

    return (
        <main className="centered-container content-container">
            <div className="main-wrapper">
                <div className="main-container">
                    <div className="main-topic">
                        <ArrowButton buttonCallback={previousButtonHandler}
                                     imageUrl={'/assets/images/UpArrow.svg'}
                                     classNames={'previous_button cursorable'}
                        />
                        <Content title={currentTopic?.title || ""}
                                 imageUri={fileService.getFileName(currentTopic?.imageUri || "")}
                                 number={currentTopic?.number || 0}
                                 clickHandler={chooseClickHandle}
                        />
                        <RatingBar />
                        <ArrowButton buttonCallback={nextButtonHandler}
                                     imageUrl={'/assets/images/DownArrow.svg'}
                                     classNames={'next_button cursorable'}
                        />

                    </div>
                </div>
            </div>
        </main>
    )
}