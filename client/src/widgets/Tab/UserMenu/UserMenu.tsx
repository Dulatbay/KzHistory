import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, {FC} from "react";
import {IPage} from "../Tab";
import IUser from "@/shared/types/IUser";

interface IProps {
    handleOpenUserMenu: React.MouseEventHandler,
    anchorElUser: any,
    settings: IPage[],
    handleCloseUserMenu: (path: string | null) => void,
    user: IUser
}

export const UserMenu: FC<IProps> = ({user, handleCloseUserMenu, handleOpenUserMenu, anchorElUser, settings}) => {
    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt={`${user.username}`} src={`${user.imageUri}`}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu(null)}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.path)}>
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};
