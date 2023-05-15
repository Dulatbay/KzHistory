import {Tab} from "../../components/Tab/Tab";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {useEffect} from "react";

export const HomePage = () => {
    const {user} = useAppSelector(state => state.userState)
    const navigate = useNavigate()


    useEffect(()=>{
        if(!user) navigate('/login')
    }, [user, navigate])

    return <>
        <Tab/>
        <Outlet/>
    </>
}