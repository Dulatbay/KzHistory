import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FC} from "react";

interface IProps {
    problemsLeft: number,
    level: number,
    totalDates: number,
    peoplePassed: number,
}

export const TopicCard: FC<IProps> = ({
                                          totalDates,
                                          level,
                                          problemsLeft,
                                          peoplePassed
                                      }) => {
    return (
        <Box>
            <Typography>TopicCard</Typography>
            <Typography>TopicCard</Typography>
            <Typography>TopicCard</Typography>
            <Typography>TopicCard</Typography>
        </Box>
    );
};
