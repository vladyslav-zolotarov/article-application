import React, { FC } from 'react';
import { IUser } from '../../types/types';

interface UserPostProps {
    user: IUser;
}

const UserPost: FC<UserPostProps> = ({user}) => {
    return (
        <div className='user__info'>
            <span>Fullname: {user.fullName}</span>
            <span>Email: {user.email}</span>
            <span>Avatar url: {user.avatarUrl}</span>
            <span>Account created at: {user.createdAt}</span>
        </div>
    );
};

export default UserPost;