import React from "react";
import * as pages from '../pages'
export interface IRoute {
    path: string,
    component: React.ComponentType,
    index?: boolean
}

export enum RouteNames {
    HOME = '/',
    REGISTRATION = '/registration',
    LOGIN = '/login',
    NOT_FOUND = '/*'
}

export const routes : IRoute[] = [
    {path: RouteNames.HOME, component: pages.HomePage},
    {path: RouteNames.REGISTRATION, component: pages.RegistrationPage},
    {path: RouteNames.LOGIN, component: pages.LoginPage},
    {path: RouteNames.NOT_FOUND, component: pages.NotFoundPage},
]