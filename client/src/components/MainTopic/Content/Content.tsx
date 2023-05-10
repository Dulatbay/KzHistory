import {FC} from "react";
import $api, {BASE_URL} from "../../../services/axiosService";

interface ContentProps {
    title: string,
    imageUri: string
}

export const Content: FC<ContentProps> = ({title, imageUri}) => {
    return (
        <div className="content flex-column-center">
            <div className="title cursorable">title</div>
            <div className="image cursorable">
                <img className="border-round" src={imageUri} alt=""/>
            </div>
        </div>
    )
}