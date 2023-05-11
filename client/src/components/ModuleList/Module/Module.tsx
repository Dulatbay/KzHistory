import {FC, MouseEventHandler} from "react";
import {ArrowButton} from "../../generetic/ArrowButton/ArrowButton";
import IModule from "../../../types/IModule";
import {fileService} from "../../../services/fileService";
import {useAction} from "../../../hooks/useAction";
import {useNavigate} from "react-router-dom";


export const Module: FC<{
    module: IModule,
    currentIndex: number,
    previousButtonHandle: MouseEventHandler,
    nextButtonHandle: MouseEventHandler
}> =
    ({
         module,
         currentIndex,
         previousButtonHandle,
         nextButtonHandle
     }) => {

        const navigate = useNavigate();
        const userAction = useAction()
        return (
            <div className="module  centered-container">
                <ArrowButton buttonCallback={previousButtonHandle}
                             imageUrl="./assets/images/LeftArrow.svg"
                             classNames="cursorable"/>
                <div className="content flex-column-center">
                    <div className="module-text secondary-text">Module {currentIndex + 1}</div>
                    <div className="module-image ">
                        <img src={fileService.getFileName(module.imageUri)} alt="" className="border-round"/>
                    </div>
                    <div className="module-title">
                        {module.title}
                    </div>
                    <button className="button border-round primary-button cursorable"
                            onClick={() => {
                                userAction.changeModule(module);
                                navigate('/')
                            }}
                    >Перейти к темам
                    </button>
                </div>
                <ArrowButton buttonCallback={nextButtonHandle}
                             imageUrl="./assets/images/RightArrow.svg"
                             classNames="cursorable"/>

            </div>
        )
    }