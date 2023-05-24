import React, {FC} from "react";
import {BrowserRouter} from "react-router-dom";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider} from "@mui/material";
// import {theme} from "@/app/styles/theme";
import {appStore, persistedStore} from "@/app/store/appStore";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as ReduxProvider} from "react-redux/es/exports";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {MapProvider} from "react-map-gl";

const queryClient = new QueryClient();

const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: '#adb31b',
        },
    },
}));
export const MainProvider: FC<React.PropsWithChildren> = ({children}) => {
    return (
        <ReduxProvider store={appStore}>
            <BrowserRouter>
                <PersistGate loading={null} persistor={persistedStore}>
                    <MapProvider>
                        {children}
                    </MapProvider>
                </PersistGate>
            </BrowserRouter>
        </ReduxProvider>
    );
};