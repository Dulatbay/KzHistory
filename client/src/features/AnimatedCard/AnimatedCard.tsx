import {Paper, styled, Theme} from "@mui/material";
import Box from "@mui/material/Box";
import {FC, useState} from "react";
import {theme} from "@/app/styles/theme";

const Image = styled("img")(({theme}) => `
    width: 100%;
    height: 100%;
`);

const Container = styled(Box)(
    ({theme, isHovered, height, width}: {
        theme: Theme;
        isHovered: boolean,
        height: number,
        width: number
    }) => `
    border: solid 4px ${theme.palette.secondary.main};
    border-radius: 15px;
    max-height: ${height}px;
    max-width: ${width}px;
    overflow: hidden;
    background: #000;
    transition: transform 0.2s ease-out;
    cursor: pointer;
    position: relative;

    :before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: ${isHovered ? 0 : 1};
        transition: opacity 0.2s ease-out;
        z-index: 1;
    }

    :hover {
        transform: scale(1.01);
    };

    @media screen and (max-width: 490px){
        max-height: 200px;
        max-width: 250px;
    };
`);


const ChildContainer = styled(Box)(
    ({theme}) => (`
        position: absolute;
    `)
);


interface IProps extends React.PropsWithChildren {
    imageUri: string,
    width: number,
    height: number
}

export const AnimatedCard: FC<IProps> = ({imageUri, children, width, height}) => {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnterHandler = () => {
        setIsHovered(true);
    };

    const onMouseLeaveHandler = () => {
        setIsHovered(false);
    };

    return (
        <Container
            theme={theme}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            isHovered={isHovered}
            width={width}
            height={height}
        >
            <ChildContainer>
                {children}
            </ChildContainer>
            <Image src={imageUri} alt="logo"/>
        </Container>
    );
};
