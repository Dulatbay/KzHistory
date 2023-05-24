import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {FC} from "react";
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';

interface IProps extends React.PropsWithChildren {
    contentTitle: string
}

export const ContentContainer: FC<IProps> = ({contentTitle, children}) => {
    return (
        <Stack spacing={2}
               mb={8}
               flexWrap="wrap"
        >
            <Stack direction="row"
                   justifyContent="flex-start"
                   alignItems="center"
                   spacing={0.5}
            >
                <AlbumRoundedIcon fontSize="small"
                                  color="primary"/>
                <Typography variant="h5" fontWeight={500}>
                    {contentTitle}
                </Typography>
            </Stack>
            <Stack direction="row"
                   justifyContent="flex-start"
                   alignItems="center"
                   useFlexGap flexWrap="wrap"
                   spacing={4}
            >
                {children}
            </Stack>
        </Stack>
    );
};
