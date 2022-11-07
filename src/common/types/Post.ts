import IComment from "./Comment";

export default interface IPost{
    id: string;
    points: number;
    title: string;
    authorEmail: string | Promise<any>;
    date: string;
    content: string;
    comments: IComment[];
}