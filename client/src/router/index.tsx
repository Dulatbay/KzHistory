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
    PROFILE = '/profile',
    NOT_FOUND = '/*'
}

export const routes : IRoute[] = [
    {path: RouteNames.REGISTRATION, component: pages.RegPage},
    {path: RouteNames.LOGIN, component: pages.LoginPage},
    {path: RouteNames.NOT_FOUND, component: pages.NotFoundPage},
]