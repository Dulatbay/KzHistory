import {FC, useEffect, useState} from "react";
import {moduleService} from "../../services/moduleService";
import IModule from "../../types/IModule";
import {Module} from "./Module/Module";
import {useAction} from "../../hooks/useAction";

export const ModuleList: FC = () => {
    const [modules, setModules] = useState<IModule[]>([]);
    const [moduleIndex, setModuleIndex] = useState(0)
    const userAction = useAction();

    useEffect(() => {
        moduleService.findAll().then(response => setModules(response.data));
        localStorage.removeItem('currentTopicNumber')
    }, [])

    useEffect(() => {
        userAction.changeModule(modules[moduleIndex]);
    }, [modules])

    const previousButtonHandle = () => {
        if (moduleIndex === 0) return;
        userAction.changeModule(modules[moduleIndex - 1]);
        setModuleIndex(moduleIndex - 1);
    }
    const nextButtonHandle = () => {
        if (moduleIndex === modules.length - 1) return;
        userAction.changeModule(modules[moduleIndex + 1]);
        setModuleIndex(moduleIndex + 1);
    }

    return (
        <div className="module-list-container">
            <div className="title secondary-text">Все модули</div>
            <div className="module-container">
                {
                    modules.length ? <Module module={modules[moduleIndex]}
                                             currentIndex={moduleIndex}
                                             previousButtonHandle={previousButtonHandle}
                                             nextButtonHandle={nextButtonHandle}
                    /> : ""
                }
            </div>
        </div>
    );
}