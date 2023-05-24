import CastleRoundedIcon from "@mui/icons-material/CastleRounded";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {FC} from "react";
import {IPage} from "../Tab";

interface IProps {
    pages: IPage[],
    handleCloseNavMenu: (path: string) => void,
    logoText: string
}

export const DesktopNavMenu: FC<IProps> = ({pages, handleCloseNavMenu, logoText}) => {
    return (
        <>
            <CastleRoundedIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {logoText}
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages.map((page) => (
                    <Button
                        key={page.name}
                        onClick={() => handleCloseNavMenu(page.path)}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>
        </>
    );
};
