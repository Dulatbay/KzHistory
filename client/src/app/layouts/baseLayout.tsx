import {Tab} from "@/widgets/Tab/Tab";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";

export const BaseLayout = () => {
    return (
        <>
            <Tab/>
            <Box sx={{
                marginLeft: 4,
                marginRight: 4,
                marginTop: 3,
            }}>
                <Outlet/>
            </Box>
        </>
    );
};