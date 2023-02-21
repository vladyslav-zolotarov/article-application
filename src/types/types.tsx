export interface IUser {
    _id?: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    createdAt?: string;
    passwordHash: string;
    updatedAt?: string;
}

export interface IUserRegister {
    fullName: string;
    email: string;
    password: string;
    token: string;
}

export interface IUserLogin {
    email: string;
    password: string;
    token: string;
}
    
export interface IPost {
    _id: string;
    title: string;
    text: string;
    viewsCount: number;
    createdAt: string;
    updatedAt: string;
    user: IUser;
    imageUrl: string | any;
    tags: Array<string>;
}