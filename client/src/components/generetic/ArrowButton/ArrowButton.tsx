import React, {FC, MouseEventHandler} from "react";

interface ArrowButtonProps {
    buttonCallback: MouseEventHandler,
    imageUrl: string,
    classNames: string
}

export const ArrowButton: FC<ArrowButtonProps> = ({buttonCallback, imageUrl, classNames}) => {
    return (
        <div className={classNames} onClick={buttonCallback}>
            <img className="arrow" src={imageUrl} alt=""/>
        </div>
    )
}