export default interface IUser {
    id: number
    email: string,
    username: string,
    league: string,
    lastPlay: string | null,
    imageUri: string | null,
    role: string
}