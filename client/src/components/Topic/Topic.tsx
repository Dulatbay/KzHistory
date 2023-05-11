import React, {FC, useEffect, useState} from "react";
import {PdfContainer} from "./PdfContainer/PdfContainer";
import {useAppSelector} from "../../store/hooks";
import ITopic from "../../types/ITopic";

export const Topic: FC = () => {
    const moduleState = useAppSelector(state => state.moduleState)
    const [currentTopic, setCurrentTopic] = useState<ITopic>();

    useEffect(() => {
        const topic = moduleState.currentModule?.topics.find((t) => t.number === moduleState.currentTopicNumber)
        setCurrentTopic(topic);
    }, [moduleState])
    return (
        <div className="topic">
            <PdfContainer filename={currentTopic?.fileUri || ""}/>
        </div>
    )

};
