import {FC, MouseEventHandler} from "react";

interface ContentProps {
    title: string,
    imageUri: string,
    number: number,
    clickHandler: MouseEventHandler
}

export const Content: FC<ContentProps> = ({title, imageUri,clickHandler}) => {
    return (
        <div className="content flex-column-center">
            <div className="title cursorable">{title}</div>
            <div className="image cursorable" onClick={clickHandler}>
                <img className="border-round" src={imageUri} alt=""/>
            </div>
        </div>
    )
}