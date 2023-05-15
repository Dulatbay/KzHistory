import {Tab} from "../../components/Tab/Tab";
import {Outlet} from "react-router-dom";

export const HomePage = () => {
    return <>
        <Tab/>
        <Outlet/>
    </>
}