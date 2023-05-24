import IUser from "@/shared/types/IUser";

export type SessionDto = {
    accessToken: string
    user: IUser
}

export type RequestLoginBody = {
    email: string
    password: string
}

export type RequestRegistrationBody = {
    email: string
    password: string
}

