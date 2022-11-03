import IComment from "./Comment";

export default interface IPost{
    id: string;
    points: number;
    title: string;
    author: string;
    date: Date;
    content: string;
    comments: IComment[];
}