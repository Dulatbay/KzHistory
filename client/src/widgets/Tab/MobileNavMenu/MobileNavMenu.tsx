import CastleRoundedIcon from "@mui/icons-material/CastleRounded";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {FC} from "react";
import {IPage} from "../Tab";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface IProps {
    pages: IPage[],
    logoText: string,
    handleCloseNavMenu: (path: string | null) => void,
    handleOpenNavMenu: React.MouseEventHandler,
    anchorElNav: HTMLElement | null,
}

export const MobileNavMenu: FC<IProps> = ({
                                              pages,
                                              handleCloseNavMenu,
                                              logoText,
                                              handleOpenNavMenu,
                                              anchorElNav
                                          }) => {
    return (
        <>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={() => handleCloseNavMenu(null)}
                    sx={{
                        display: {xs: 'block', md: 'none'},
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <CastleRoundedIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                    mr: 2,
                    display: {xs: 'flex', md: 'none'},
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {logoText}
            </Typography>
        </>
    );
};
