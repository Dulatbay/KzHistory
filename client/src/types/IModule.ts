import ITopic from "./ITopic";

export default interface IModule {
    id: number,
    number: number,
    title: string,
    imageUri: string,
    topics: ITopic[]
}