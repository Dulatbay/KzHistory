import {FC} from "react";

export interface StateProps {
    image: string,
    title: string,
    secondary: string
}

export const State: FC<StateProps> = ({image, title, secondary}) => {
    return (
        <div className='profile-statistics-state border-round'>
            <div className='left'>
                <img src={image} alt=""/>
            </div>
            <div className='right'>
                <div className='title'>{title}</div>
                <div className='secondary-text'>{secondary}</div>
            </div>
        </div>
    )
}

