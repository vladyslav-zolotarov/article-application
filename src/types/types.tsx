export interface IUser {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    passwordHash: string;
    updatedAt: string;
}

export interface IPosts {
    _id: string;
    title: string;
    text: string;
    viewsCount: number;
    createdAt: string;
    updatedAt: string;
    user: IUser;
    imageUrl: string;
    tags: Array<string>;
}