import React, {FC} from "react";
import {ArrowButton} from "../generetic/ArrowButton/ArrowButton";
import {RatingBar} from "./RatingBar/RatingBar";
import {Content} from "./Content/Content";

export const MainTopic: FC = () => {
    const previousButtonHandler = () => {
        console.log("previousButtonHandler")
    }
    const nextButtonHandler = () => {
        console.log("nextButtonHandler")
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
                        <Content title={"Test"} imageUri={"http://localhost:8080/static/1234.jpg"}/>
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